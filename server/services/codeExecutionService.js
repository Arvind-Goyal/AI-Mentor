import https from "https";
import { getTestCasesForProblem } from "./leetcodeService.js";

const COMPILER_MAP = {
  python: "cpython-3.12.7",
  py: "cpython-3.12.7",
  python3: "cpython-3.12.7",
  javascript: "nodejs-20.17.0",
  js: "nodejs-20.17.0",
  node: "nodejs-20.17.0",
  java: "openjdk-jdk-21+35",
  "c++": "gcc-13.2.0",
  cpp: "gcc-13.2.0",
};

/**
 * Universal helper to split LeetCode testcase input strings into separate argument values.
 * Handles assignments like `nums = [2,7,11,15], target = 9`, multiline strings, matrices, etc.
 */
export const splitInputArguments = (inputStr) => {
  if (!inputStr || typeof inputStr !== "string") return [];
  const s = inputStr.trim();
  const list = [];
  let inQuotes = false;
  let depth = 0;
  let start = 0;
  const hasAssignment = s.includes("=");

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"' && (i === 0 || s[i - 1] !== '\\')) {
      inQuotes = !inQuotes;
    } else if (!inQuotes) {
      if (c === "[" || c === "{" || c === "(") depth++;
      else if (c === "]" || c === "}" || c === ")") depth--;
      else if (depth === 0 && c === ",") {
        if (hasAssignment) {
          const rest = s.substring(i + 1);
          const match = rest.match(/^\s*([a-zA-Z0-9_]+)\s*=/);
          if (match) {
            list.push(s.substring(start, i).trim());
            start = i + 1;
          }
        } else {
          list.push(s.substring(start, i).trim());
          start = i + 1;
        }
      }
    }
  }
  if (start < s.length) {
    list.push(s.substring(start).trim());
  }

  return list.map((item) => {
    let t = item.trim();
    if (t.includes("=")) {
      const eq = t.indexOf("=");
      if (!t.startsWith("[") && !t.startsWith('"')) {
        t = t.substring(eq + 1).trim();
      }
    }
    return t;
  });
};

/**
 * Maps raw argument value to a valid C++ typed variable declaration and initialization.
 */
const mapToCppTypeAndValue = (rawArg, paramType) => {
  const pType = (paramType || "").toLowerCase().trim();
  const raw = (rawArg || "").trim();

  if (pType.includes("listnode") || pType === "listnode") {
    const listInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "ListNode*", val: `_to_list_node(${listInit})` };
  }
  if (pType.includes("treenode") || pType === "treenode") {
    const treeInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "TreeNode*", val: `_to_tree_node(${treeInit})` };
  }
  if (pType.includes("character[][]") || pType.includes("char[][]")) {
    const matInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "vector<vector<char>>", val: matInit };
  }
  if (pType.includes("integer[][]") || pType.includes("int[][]") || pType.includes("list<list<integer>>")) {
    const matInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "vector<vector<int>>", val: matInit };
  }
  if (pType.includes("integer[]") || pType.includes("int[]") || pType.includes("list<integer>")) {
    const vecInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "vector<int>", val: vecInit };
  }
  if (pType.includes("string[]") || pType.includes("list<string>")) {
    const vecInit = raw.replace(/\[/g, "{").replace(/\]/g, "}");
    return { type: "vector<string>", val: vecInit };
  }
  if (pType === "string") {
    let sVal = raw;
    if (!sVal.startsWith('"')) sVal = `"${sVal}"`;
    return { type: "string", val: sVal };
  }
  if (pType === "character" || pType === "char") {
    let cVal = raw.replace(/["']/g, "").trim();
    if (!cVal) cVal = " ";
    return { type: "char", val: `'${cVal[0]}'` };
  }
  if (pType === "boolean" || pType === "bool") {
    return { type: "bool", val: raw.toLowerCase().includes("true") ? "true" : "false" };
  }
  if (pType === "double") {
    return { type: "double", val: raw.replace(/[^0-9.-]/g, "") || "0.0" };
  }
  if (pType === "long") {
    return { type: "long long", val: (raw.replace(/[^0-9-]/g, "") || "0") + "LL" };
  }
  if (raw.startsWith("[[")) {
    return { type: "vector<vector<int>>", val: raw.replace(/\[/g, "{").replace(/\]/g, "}") };
  }
  if (raw.startsWith("[")) {
    return { type: "vector<int>", val: raw.replace(/\[/g, "{").replace(/\]/g, "}") };
  }
  if (raw.startsWith('"')) {
    return { type: "string", val: raw };
  }
  if (raw === "true" || raw === "false") {
    return { type: "bool", val: raw };
  }
  return { type: "int", val: raw.replace(/[^0-9-]/g, "") || "0" };
};

/**
 * Normalizes and prepares code for execution across different languages.
 * Automatically injects test runners when LeetCode test cases are provided.
 */
export const preprocessCode = (language, code, testCases = [], metadata = null) => {
  const lang = (language || "").toLowerCase().trim();
  let processed = code || "";
  const validTestCases = Array.isArray(testCases) ? testCases.filter((tc) => tc && tc.input) : [];

  if (lang === "java") {
    // Replace "public class" with "class" so single-file compilation works regardless of class name
    processed = processed.replace(/\bpublic\s+class\b/g, "class");
    let javaImports = "";
    if (!processed.includes("java.util.")) {
      javaImports = "import java.util.*;\nimport java.io.*;\n\n";
    }

    let javaHelpers = "";
    if (!/^\s*(?:public\s+)?(?:static\s+)?class\s+ListNode\b/m.test(processed)) {
      javaHelpers += `
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        ListNode curr = this;
        int count = 0;
        while (curr != null && count < 50) {
            if (count > 0) sb.append(",");
            sb.append(curr.val);
            curr = curr.next;
            count++;
        }
        sb.append("]");
        return sb.toString();
    }
}
`;
    }

    if (!/^\s*(?:public\s+)?(?:static\s+)?class\s+TreeNode\b/m.test(processed)) {
      javaHelpers += `
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    @Override
    public String toString() {
        return "TreeNode(" + val + ")";
    }
}
`;
    }

    if (!/^\s*(?:public\s+)?(?:static\s+)?class\s+Node\b/m.test(processed)) {
      javaHelpers += `
class Node {
    int val;
    Node next;
    Node random;
    List<Node> neighbors;
    Node() { neighbors = new ArrayList<Node>(); }
    Node(int _val) { val = _val; neighbors = new ArrayList<Node>(); }
    Node(int _val, List<Node> _neighbors) { val = _val; neighbors = _neighbors; }
    Node(int _val, Node _next, Node _random) { val = _val; next = _next; random = _random; }
}
`;
    }

    processed = javaImports + (javaHelpers ? javaHelpers + "\n" : "") + processed;

    if (!processed.includes("main(")) {
      const sanitizedCases = validTestCases.slice(0, 8);
      const preferredMethodName = metadata?.name || "";
      const runnerCode = `

class AutoRunner {
    static String _unquote(String s) {
        if (s == null) return "";
        s = s.trim();
        if (s.length() >= 2 && s.charAt(0) == 34 && s.charAt(s.length() - 1) == 34) {
            return s.substring(1, s.length() - 1);
        }
        return s;
    }

    static String _escapeJson(String s) {
        if (s == null) return "null";
        StringBuilder sb = new StringBuilder();
        sb.append((char)34);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == 34) {
                sb.append('\\\\').append((char)34);
            } else if (c == '\\\\') {
                sb.append('\\\\').append('\\\\');
            } else if (c == '\\n') {
                sb.append('\\\\').append('n');
            } else if (c == '\\r') {
                sb.append('\\\\').append('r');
            } else if (c == '\\t') {
                sb.append('\\\\').append('t');
            } else {
                sb.append(c);
            }
        }
        sb.append((char)34);
        return sb.toString();
    }

    static List<String> _splitArgs(String s) {
        List<String> list = new ArrayList<>();
        if (s == null || s.trim().isEmpty()) return list;
        boolean inQuotes = false;
        int depth = 0;
        int start = 0;
        int n = s.length();
        boolean hasAssignment = s.contains("=");
        for (int i = 0; i < n; i++) {
            char c = s.charAt(i);
            if (c == 34 && (i == 0 || s.charAt(i - 1) != '\\\\')) {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '[' || c == '{' || c == '(') depth++;
                else if (c == ']' || c == '}' || c == ')') depth--;
                else if (depth == 0 && c == ',') {
                    if (hasAssignment) {
                        int j = i + 1;
                        while (j < n && Character.isWhitespace(s.charAt(j))) j++;
                        int idStart = j;
                        while (j < n && (Character.isLetterOrDigit(s.charAt(j)) || s.charAt(j) == '_')) j++;
                        int idEnd = j;
                        while (j < n && Character.isWhitespace(s.charAt(j))) j++;
                        if (idEnd > idStart && j < n && s.charAt(j) == '=') {
                            list.add(s.substring(start, i).trim());
                            start = i + 1;
                        }
                    } else {
                        list.add(s.substring(start, i).trim());
                        start = i + 1;
                    }
                }
            }
        }
        if (start < n) {
            list.add(s.substring(start).trim());
        }
        for (int i = 0; i < list.size(); i++) {
            String item = list.get(i).trim();
            if (item.contains("=")) {
                int eq = item.indexOf('=');
                if (eq > 0 && !item.startsWith("[") && (item.isEmpty() || item.charAt(0) != 34)) {
                    item = item.substring(eq + 1).trim();
                    list.set(i, item);
                }
            }
        }
        return list;
    }

    static ListNode _parseListNode(String s) {
        if (s == null) return null;
        int start = s.indexOf('[');
        int end = s.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) {
            s = s.substring(start + 1, end).trim();
        }
        if (s.isEmpty()) return null;
        String[] parts = s.split(",");
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        for (String p : parts) {
            p = p.trim();
            if (!p.isEmpty() && !p.equals("null")) {
                try {
                    cur.next = new ListNode(Integer.parseInt(p));
                    cur = cur.next;
                } catch (Exception e) {}
            }
        }
        return dummy.next;
    }

    static TreeNode _parseTreeNode(String s) {
        if (s == null) return null;
        int start = s.indexOf('[');
        int end = s.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) {
            s = s.substring(start + 1, end).trim();
        }
        if (s.isEmpty()) return null;
        String[] parts = s.split(",");
        if (parts.length == 0 || parts[0].trim().equals("null") || parts[0].trim().isEmpty()) return null;
        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            TreeNode curr = q.poll();
            if (i < parts.length && !parts[i].trim().equals("null") && !parts[i].trim().isEmpty()) {
                curr.left = new TreeNode(Integer.parseInt(parts[i].trim()));
                q.add(curr.left);
            }
            i++;
            if (i < parts.length && !parts[i].trim().equals("null") && !parts[i].trim().isEmpty()) {
                curr.right = new TreeNode(Integer.parseInt(parts[i].trim()));
                q.add(curr.right);
            }
            i++;
        }
        return root;
    }

    static int[] _parseIntArray(String s) {
        if (s == null) return new int[0];
        int start = s.indexOf('[');
        int end = s.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) {
            s = s.substring(start + 1, end).trim();
        }
        if (s.isEmpty()) return new int[0];
        String[] parts = s.split(",");
        List<Integer> list = new ArrayList<>();
        for (String p : parts) {
            p = p.trim();
            if (!p.isEmpty() && !p.equals("null")) {
                try { list.add(Integer.parseInt(p)); } catch (Exception e) {}
            }
        }
        int[] arr = new int[list.size()];
        for (int i = 0; i < list.size(); i++) arr[i] = list.get(i);
        return arr;
    }

    static int[][] _parseIntMatrix(String s) {
        if (s == null) return new int[0][0];
        List<int[]> rows = new ArrayList<>();
        int depth = 0;
        int start = -1;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '[') {
                depth++;
                if (depth == 2) start = i;
            } else if (c == ']') {
                if (depth == 2 && start != -1) {
                    rows.add(_parseIntArray(s.substring(start, i + 1)));
                    start = -1;
                }
                depth--;
            }
        }
        return rows.toArray(new int[0][]);
    }

    static char[][] _parseCharMatrix(String s) {
        if (s == null) return new char[0][0];
        List<char[]> rows = new ArrayList<>();
        int depth = 0;
        int start = -1;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '[') {
                depth++;
                if (depth == 2) start = i;
            } else if (c == ']') {
                if (depth == 2 && start != -1) {
                    String sub = s.substring(start + 1, i);
                    String[] parts = sub.split(",");
                    char[] r = new char[parts.length];
                    for (int j = 0; j < parts.length; j++) {
                        String clean = parts[j].replace(String.valueOf((char)34), "").replace("'", "").trim();
                        r[j] = clean.isEmpty() ? ' ' : clean.charAt(0);
                    }
                    rows.add(r);
                    start = -1;
                }
                depth--;
            }
        }
        return rows.toArray(new char[0][]);
    }

    static String[] _parseStringArray(String s) {
        if (s == null) return new String[0];
        int start = s.indexOf('[');
        int end = s.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) {
            s = s.substring(start + 1, end).trim();
        }
        if (s.isEmpty()) return new String[0];
        String[] parts = s.split(",");
        String[] res = new String[parts.length];
        for (int i = 0; i < parts.length; i++) {
            res[i] = _unquote(parts[i]);
        }
        return res;
    }

    static List<Object> _parseList(String s) {
        List<Object> list = new ArrayList<>();
        if (s == null) return list;
        int start = s.indexOf('[');
        int end = s.lastIndexOf(']');
        if (start != -1 && end != -1 && end > start) s = s.substring(start + 1, end).trim();
        if (s.isEmpty()) return list;
        if (s.contains("[")) {
            int depth = 0;
            int subStart = -1;
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '[') {
                    if (depth == 0) subStart = i;
                    depth++;
                } else if (s.charAt(i) == ']') {
                    depth--;
                    if (depth == 0 && subStart != -1) {
                        list.add(_parseList(s.substring(subStart, i + 1)));
                        subStart = -1;
                    }
                }
            }
            return list;
        }
        for (String p : s.split(",")) {
            p = p.trim();
            if (p.isEmpty()) continue;
            try {
                list.add(Integer.parseInt(p));
            } catch (Exception e) {
                list.add(_unquote(p));
            }
        }
        return list;
    }

    static Object _convertArg(String raw, Class<?> type) {
        if (raw == null) raw = "";
        raw = raw.trim();
        if (type == int.class || type == Integer.class) {
            try { return Integer.parseInt(raw.replaceAll("[^0-9-]", "").trim()); } catch (Exception e) { return 0; }
        } else if (type == long.class || type == Long.class) {
            try { return Long.parseLong(raw.replaceAll("[^0-9-]", "").trim()); } catch (Exception e) { return 0L; }
        } else if (type == double.class || type == Double.class) {
            try { return Double.parseDouble(raw.replaceAll("[^0-9.-]", "").trim()); } catch (Exception e) { return 0.0; }
        } else if (type == float.class || type == Float.class) {
            try { return Float.parseFloat(raw.replaceAll("[^0-9.-]", "").trim()); } catch (Exception e) { return 0.0f; }
        } else if (type == boolean.class || type == Boolean.class) {
            return "true".equalsIgnoreCase(raw.trim());
        } else if (type == char.class || type == Character.class) {
            String c = raw.replace("'", "").replace(String.valueOf((char)34), "").trim();
            return c.isEmpty() ? ' ' : c.charAt(0);
        } else if (type == String.class) {
            return _unquote(raw);
        } else if (type == int[].class) {
            return _parseIntArray(raw);
        } else if (type == int[][].class) {
            return _parseIntMatrix(raw);
        } else if (type == char[][].class) {
            return _parseCharMatrix(raw);
        } else if (type == String[].class) {
            return _parseStringArray(raw);
        } else if (type == ListNode.class) {
            return _parseListNode(raw);
        } else if (type == TreeNode.class) {
            return _parseTreeNode(raw);
        } else if (List.class.isAssignableFrom(type)) {
            return _parseList(raw);
        }
        return null;
    }

    static String _cleanOutput(String s) {
        if (s == null) return "";
        return s.trim().replaceAll("\\\\s+", "");
    }

    static String _format(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof CharSequence || obj instanceof Character) {
            return (char)34 + obj.toString() + (char)34;
        }
        if (obj instanceof int[]) return Arrays.toString((int[]) obj).replaceAll("\\\\s+", "");
        if (obj instanceof long[]) return Arrays.toString((long[]) obj).replaceAll("\\\\s+", "");
        if (obj instanceof double[]) return Arrays.toString((double[]) obj).replaceAll("\\\\s+", "");
        if (obj instanceof boolean[]) return Arrays.toString((boolean[]) obj).replaceAll("\\\\s+", "");
        if (obj instanceof Object[]) return Arrays.deepToString((Object[]) obj).replaceAll("\\\\s+", "");
        if (obj instanceof ListNode) return obj.toString();
        if (obj instanceof TreeNode) {
            TreeNode root = (TreeNode) obj;
            List<String> vals = new ArrayList<>();
            Queue<TreeNode> q = new LinkedList<>();
            q.add(root);
            while (!q.isEmpty()) {
                TreeNode curr = q.poll();
                if (curr != null) {
                    vals.add(String.valueOf(curr.val));
                    q.add(curr.left);
                    q.add(curr.right);
                } else {
                    vals.add("null");
                }
            }
            while (!vals.isEmpty() && vals.get(vals.size() - 1).equals("null")) {
                vals.remove(vals.size() - 1);
            }
            return "[" + String.join(",", vals) + "]";
        }
        if (obj instanceof List) {
            return obj.toString().replaceAll("\\\\s+", "");
        }
        return obj.toString().replaceAll("\\\\s+", "");
    }

    static boolean _matches(String actualFormatted, String expectedStr) {
        String a = actualFormatted.trim().replaceAll("\\\\s+", "");
        String e = expectedStr.trim().replaceAll("\\\\s+", "");
        if (a.equals(e)) return true;
        if (("null".equals(a) || "[]".equals(a)) && ("null".equals(e) || "[]".equals(e))) {
            return true;
        }
        String unA = _unquote(a);
        String unE = _unquote(e);
        if (unA.equals(unE)) return true;
        try {
            double d1 = Double.parseDouble(unA);
            double d2 = Double.parseDouble(unE);
            if (Math.abs(d1 - d2) < 1e-4) return true;
        } catch (Exception ex) {}
        if (("true".equalsIgnoreCase(unA) || "false".equalsIgnoreCase(unA)) && ("true".equalsIgnoreCase(unE) || "false".equalsIgnoreCase(unE))) {
            return unA.equalsIgnoreCase(unE);
        }
        if (unA.startsWith("[") && unA.endsWith("]") && unE.startsWith("[") && unE.endsWith("]")) {
            String[] aParts = unA.substring(1, unA.length() - 1).split(",");
            String[] eParts = unE.substring(1, unE.length() - 1).split(",");
            if (aParts.length == eParts.length) {
                Arrays.sort(aParts);
                Arrays.sort(eParts);
                if (Arrays.equals(aParts, eParts)) return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        boolean executedAny = false;
        try {
            Class<?> solClass = Class.forName("Solution");
            Object solInstance = solClass.getDeclaredConstructor().newInstance();
            java.lang.reflect.Method targetMethod = null;
            String preferredName = "${preferredMethodName}";
            for (java.lang.reflect.Method m : solClass.getDeclaredMethods()) {
                if (java.lang.reflect.Modifier.isPublic(m.getModifiers()) && !m.isSynthetic()) {
                    if (!preferredName.isEmpty() && m.getName().equals(preferredName)) {
                        targetMethod = m;
                        break;
                    }
                    if (targetMethod == null) {
                        targetMethod = m;
                    }
                }
            }

            if (targetMethod != null) {
                targetMethod.setAccessible(true);
                Class<?>[] pTypes = targetMethod.getParameterTypes();
${sanitizedCases.map((tc, idx) => {
  const escIn = tc.input.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  const escOut = (tc.output || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  return `
            {
                String inputStr = "${escIn}";
                String expectedStr = "${escOut}";
                try {
                    List<String> argTokens = _splitArgs(inputStr);
                    Object[] invArgs = new Object[pTypes.length];
                    for (int pi = 0; pi < pTypes.length; pi++) {
                        String r = pi < argTokens.size() ? argTokens.get(pi) : "";
                        invArgs[pi] = _convertArg(r, pTypes[pi]);
                    }
                    Object actual = targetMethod.invoke(solInstance, invArgs);
                    if (targetMethod.getReturnType() == void.class && invArgs.length > 0) {
                        actual = invArgs[0];
                    } else if (actual instanceof Integer && invArgs.length > 0 && invArgs[0] instanceof int[] && expectedStr.trim().startsWith("[")) {
                        int k = (Integer) actual;
                        int[] orig = (int[]) invArgs[0];
                        actual = Arrays.copyOf(orig, Math.min(k, orig.length));
                    }

                    if (actual != null || !expectedStr.isEmpty()) {
                        String actualFormatted = _format(actual);
                        boolean passed = _matches(actualFormatted, expectedStr);
                        System.out.println("__TEST_RESULT__:{\\\"caseIndex\\\":${idx + 1},\\\"passed\\\":" + passed + ",\\\"input\\\":" + _escapeJson(inputStr) + ",\\\"expected\\\":" + _escapeJson(expectedStr) + ",\\\"actual\\\":" + _escapeJson(actualFormatted) + "}");
                        executedAny = true;
                    }
                } catch (Throwable ex) {
                    Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
                    String errMsg = "Error: " + (cause.getMessage() != null ? cause.getMessage() : "Exception");
                    System.out.println("__TEST_RESULT__:{\\\"caseIndex\\\":${idx + 1},\\\"passed\\\":false,\\\"input\\\":" + _escapeJson(inputStr) + ",\\\"expected\\\":" + _escapeJson(expectedStr) + ",\\\"actual\\\":" + _escapeJson(errMsg) + "}");
                    executedAny = true;
                }
            }
`;
}).join("")}
            }
        } catch (Throwable t) {
            // fallback
        }

        if (!executedAny) {
            System.out.println("=== Standard LeetCode Testcases ===");
${sanitizedCases.map((tc, i) => {
  const escIn = tc.input.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  const escOut = (tc.output || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  return `            System.out.println("  Case ${i + 1}: Input: " + _escapeJson("${escIn}") + " | Expected: " + _escapeJson("${escOut}"));`;
}).join("\n")}
            System.out.println("Code compiled successfully!");
        }
    }
}
`;
      processed += runnerCode;
    }
  } else if (lang === "cpp" || lang === "c++") {
    let cppIncludes = "";
    if (!processed.includes("<iostream>")) {
      cppIncludes = "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\n#include <unordered_map>\n#include <unordered_set>\n#include <queue>\n#include <cmath>\nusing namespace std;\n\n";
    }

    let cppHelpers = "";
    if (!/^\s*(?:struct|class)\s+ListNode\b/m.test(processed)) {
      cppHelpers += `
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
`;
    }
    if (!/^\s*(?:struct|class)\s+TreeNode\b/m.test(processed)) {
      cppHelpers += `
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
`;
    }
    if (!/^\s*(?:struct|class)\s+Node\b/m.test(processed)) {
      cppHelpers += `
class Node {
public:
    int val;
    std::vector<Node*> neighbors;
    Node* next;
    Node* random;
    Node() : val(0), next(nullptr), random(nullptr) {}
    Node(int _val) : val(_val), next(nullptr), random(nullptr) {}
};
`;
    }

    processed = cppIncludes + (cppHelpers ? cppHelpers + "\n" : "") + processed;

    if (!processed.includes("main(")) {
      const sanitizedCases = validTestCases.slice(0, 8);
      const preferredMethod = metadata?.name || detectMethodFromCode(code);
      const paramsMeta = metadata?.params || [];
      const returnMeta = (metadata?.return?.type || "").toLowerCase();

      let testBlocks = "";
      if (preferredMethod && sanitizedCases.length > 0) {
        testBlocks = sanitizedCases
          .map((tc, idx) => {
            const rawTokens = splitInputArguments(tc.input);
            const argDecls = [];
            const callArgs = [];

            const count = Math.max(rawTokens.length, paramsMeta.length);
            for (let pi = 0; pi < count; pi++) {
              const pMeta = paramsMeta[pi];
              const rawVal = rawTokens[pi] || "";
              const mapped = mapToCppTypeAndValue(rawVal, pMeta?.type);
              const varName = `p${pi}`;
              argDecls.push(`            ${mapped.type} ${varName} = ${mapped.val};`);
              callArgs.push(varName);
            }

            const escIn = tc.input.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
            const escOut = (tc.output || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');

            const isVoid = returnMeta === "void";
            const invocation = isVoid
              ? `sol.${preferredMethod}(${callArgs.join(", ")});\n            auto actual = ${callArgs[0]};`
              : `auto actual = sol.${preferredMethod}(${callArgs.join(", ")});`;

            return `
        {
            string inputStr = "${escIn}";
            string expectedStr = "${escOut}";
            try {
${argDecls.join("\n")}
                ${invocation}
                string actualStr = _format(actual);
                bool passed = _matches(actualStr, expectedStr);
                cout << "__TEST_RESULT__:{\\\"caseIndex\\\":${idx + 1},\\\"passed\\\":" << (passed ? "true" : "false") << ",\\\"input\\\":" << _escape_json(inputStr) << ",\\\"expected\\\":" << _escape_json(expectedStr) << ",\\\"actual\\\":" << _escape_json(actualStr) << "}" << endl;
            } catch (const exception& ex) {
                cout << "__TEST_RESULT__:{\\\"caseIndex\\\":${idx + 1},\\\"passed\\\":false,\\\"input\\\":" << _escape_json(inputStr) << ",\\\"expected\\\":" << _escape_json(expectedStr) << ",\\\"actual\\\":" << _escape_json(string("Error: ") + ex.what()) << "}" << endl;
            } catch (...) {
                cout << "__TEST_RESULT__:{\\\"caseIndex\\\":${idx + 1},\\\"passed\\\":false,\\\"input\\\":" << _escape_json(inputStr) << ",\\\"expected\\\":" << _escape_json(expectedStr) << ",\\\"actual\\\":\\\"Runtime Error\\\"}" << endl;
            }
        }
`;
          })
          .join("\n");
      }

      const cppRunner = `

string _escape_json(const string& s) {
    string res = "";
    res += (char)34;
    for (char c : s) {
        if (c == 34) { res += '\\\\'; res += (char)34; }
        else if (c == '\\\\') { res += '\\\\'; res += '\\\\'; }
        else if (c == '\\n') { res += '\\\\'; res += 'n'; }
        else if (c == '\\r') { res += '\\\\'; res += 'r'; }
        else if (c == '\\t') { res += '\\\\'; res += 't'; }
        else res += c;
    }
    res += (char)34;
    return res;
}

ListNode* _to_list_node(const vector<int>& v) {
    if (v.empty()) return nullptr;
    ListNode dummy(0);
    ListNode* cur = &dummy;
    for (int x : v) {
        cur->next = new ListNode(x);
        cur = cur->next;
    }
    return dummy.next;
}

TreeNode* _to_tree_node(const vector<int>& v) {
    if (v.empty()) return nullptr;
    TreeNode* root = new TreeNode(v[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < v.size()) {
        TreeNode* curr = q.front(); q.pop();
        if (i < v.size() && v[i] != -999999) {
            curr->left = new TreeNode(v[i]);
            q.push(curr->left);
        }
        i++;
        if (i < v.size() && v[i] != -999999) {
            curr->right = new TreeNode(v[i]);
            q.push(curr->right);
        }
        i++;
    }
    return root;
}

template<typename T>
string _format(const vector<T>& v) {
    string s = "[";
    for (size_t i = 0; i < v.size(); i++) {
        if (i > 0) s += ",";
        s += to_string(v[i]);
    }
    s += "]";
    return s;
}
  
template<typename T>
string _format(const vector<vector<T>>& mat) {
    string s = "[";
    for (size_t i = 0; i < mat.size(); i++) {
        if (i > 0) s += ",";
        s += _format(mat[i]);
    }
    s += "]";
    return s;
}

string _format(const vector<string>& v) {
    string s = "[";
    for (size_t i = 0; i < v.size(); i++) {
        if (i > 0) s += ",";
        s += string(1, (char)34) + v[i] + string(1, (char)34);
    }
    s += "]";
    return s;
}

string _format(ListNode* head) {
    string s = "[";
    ListNode* curr = head;
    int count = 0;
    while (curr && count < 50) {
        if (count > 0) s += ",";
        s += to_string(curr->val);
        curr = curr->next;
        count++;
    }
    s += "]";
    return s;
}

string _format(TreeNode* root) {
    if (!root) return "[]";
    vector<string> vals;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        TreeNode* curr = q.front(); q.pop();
        if (curr) {
            vals.push_back(to_string(curr->val));
            q.push(curr->left);
            q.push(curr->right);
        } else {
            vals.push_back("null");
        }
    }
    while (!vals.empty() && vals.back() == "null") vals.pop_back();
    string s = "[";
    for (size_t i = 0; i < vals.size(); i++) {
        if (i > 0) s += ",";
        s += vals[i];
    }
    s += "]";
    return s;
}

string _format(int x) { return to_string(x); }
string _format(long long x) { return to_string(x); }
string _format(double x) { return to_string(x); }
string _format(bool b) { return b ? "true" : "false"; }
string _format(const string& s) { return string(1, (char)34) + s + string(1, (char)34); }
string _format(char c) { return string(1, c); }

string _clean(string s) {
    string res = "";
    for (char c : s) if (!isspace(c)) res += c;
    return res;
}

bool _matches(string a, string e) {
    string cleanA = _clean(a);
    string cleanE = _clean(e);
    if (cleanA == cleanE) return true;
    if ((cleanA == "null" || cleanA == "[]") && (cleanE == "null" || cleanE == "[]")) return true;
    string unquoteA = cleanA;
    if (unquoteA.size() >= 2 && unquoteA.front() == '"' && unquoteA.back() == '"') unquoteA = unquoteA.substr(1, unquoteA.size() - 2);
    string unquoteE = cleanE;
    if (unquoteE.size() >= 2 && unquoteE.front() == '"' && unquoteE.back() == '"') unquoteE = unquoteE.substr(1, unquoteE.size() - 2);
    if (unquoteA == unquoteE) return true;
    try {
        double d1 = stod(unquoteA);
        double d2 = stod(unquoteE);
        if (abs(d1 - d2) < 1e-4) return true;
    } catch (...) {}
    return false;
}

int main() {
    bool executedAny = false;
    try {
        Solution sol;
${testBlocks}
        executedAny = true;
    } catch (...) {}

    if (!executedAny) {
        cout << "=== Standard LeetCode Testcases ===" << endl;
${sanitizedCases.map((tc, i) => {
  const escIn = tc.input.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  const escOut = (tc.output || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, " ");
  return `        cout << "  Case ${i + 1}: Input: " << _escape_json("${escIn}") << " | Expected: " << _escape_json("${escOut}") << endl;`;
}).join("\n")}
        cout << "Code compiled successfully!" << endl;
    }
    return 0;
}
`;
      processed += cppRunner;
    }
  } else if (lang === "python" || lang === "py" || lang === "python3") {
    // Inject common LeetCode classes (ListNode, TreeNode) if not already defined as actual classes
    let leetcodeHelpers = "";
    if (!/^\s*class\s+ListNode\s*[:\(]/m.test(processed)) {
      leetcodeHelpers += `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
    def __repr__(self):
        vals = []
        curr = self
        while curr and len(vals) < 50:
            vals.append(curr.val)
            curr = curr.next
        return str(vals)
`;
    }
    if (!/^\s*class\s+TreeNode\s*[:\(]/m.test(processed)) {
      leetcodeHelpers += `
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
    def __repr__(self):
        return f"TreeNode({self.val})"
`;
    }

    let topImports = "";
    if (!processed.includes("__future__")) {
      topImports += "from __future__ import annotations\n";
    }
    if (!processed.includes("typing")) {
      topImports += "from typing import *\n\n";
    }

    processed = topImports + (leetcodeHelpers ? leetcodeHelpers + "\n" : "") + processed;

    // If LeetCode test cases are provided and Solution class is defined
    if (validTestCases.length > 0 && /class\s+Solution\b/.test(processed)) {
      const sanitizedCases = validTestCases.slice(0, 8);
      const testCasesJson = JSON.stringify(JSON.stringify(sanitizedCases));
      const harness = `

# --- AUTO-GENERATED LEETCODE TEST HARNESS ---
if __name__ == "__main__":
    import json, inspect, re, sys

    # Define common JSON / LeetCode literals for Python globals
    globals()["null"] = None
    globals()["true"] = True
    globals()["false"] = False
    null = None
    true = True
    false = False

    def _to_list_node(arr):
        if not isinstance(arr, list) or not arr:
            return None
        dummy = ListNode(0)
        cur = dummy
        for x in arr:
            cur.next = ListNode(x)
            cur = cur.next
        return dummy.next

    def _from_list_node(node):
        res = []
        cur = node
        seen = set()
        while cur and id(cur) not in seen and len(res) < 1000:
            seen.add(id(cur))
            res.append(cur.val)
            cur = cur.next
        return res

    def _to_tree_node(arr):
        if not isinstance(arr, list) or not arr:
            return None
        root = TreeNode(arr[0])
        queue = [root]
        i = 1
        while queue and i < len(arr):
            curr = queue.pop(0)
            if i < len(arr) and arr[i] is not None:
                curr.left = TreeNode(arr[i])
                queue.append(curr.left)
            i += 1
            if i < len(arr) and arr[i] is not None:
                curr.right = TreeNode(arr[i])
                queue.append(curr.right)
            i += 1
        return root

    def _from_tree_node(root):
        if not root:
            return []
        res = []
        queue = [root]
        while queue:
            node = queue.pop(0)
            if node:
                res.append(node.val)
                queue.append(node.left)
                queue.append(node.right)
            else:
                res.append(None)
        while res and res[-1] is None:
            res.pop()
        return res

    try:
        sol = Solution()
        methods = [m for m in dir(Solution) if not m.startswith("_") and callable(getattr(Solution, m))]
        if methods:
            fn = getattr(sol, methods[0])
            sig = inspect.signature(fn)
            param_names = [p for p in sig.parameters.keys() if p != "self"]
            test_specs = json.loads(${testCasesJson})

            def _normalize(val):
                if val is None:
                    return None
                if isinstance(val, (list, tuple)):
                    try:
                        return sorted(val)
                    except Exception:
                        return list(val)
                return val

            for idx, tc in enumerate(test_specs, 1):
                input_str = tc.get("input", "")
                output_str = tc.get("output", "")
                scope = {}
                converted = re.sub(r",\\s*([a-zA-Z0-9_]+)\\s*=", r"; \\1 =", input_str)
                try:
                    exec(converted, globals(), scope)
                    args = []
                    for p in param_names:
                        if p in scope:
                            v = scope[p]
                            ann = str(sig.parameters[p].annotation) if p in sig.parameters else ""
                            if ("ListNode" in ann or p in ("head", "l1", "l2", "list1", "list2", "node")) and isinstance(v, list):
                                args.append(_to_list_node(v))
                            elif ("TreeNode" in ann or p in ("root", "tree", "subRoot")) and isinstance(v, list):
                                args.append(_to_tree_node(v))
                            else:
                                args.append(v)

                    # Positional fallback if user renamed parameters
                    if len(args) < len(param_names) and scope:
                        var_order = re.findall(r"(?:^|;\\s*|\\n\\s*|,\\s*)([a-zA-Z0-9_]+)\\s*=", input_str)
                        ordered_vals = [scope[v] for v in var_order if v in scope]
                        if len(ordered_vals) == len(param_names):
                            args = []
                            for idx_p, v in enumerate(ordered_vals):
                                p = param_names[idx_p]
                                ann = str(sig.parameters[p].annotation) if p in sig.parameters else ""
                                if ("ListNode" in ann or p in ("head", "l1", "l2", "list1", "list2", "node")) and isinstance(v, list):
                                    args.append(_to_list_node(v))
                                elif ("TreeNode" in ann or p in ("root", "tree", "subRoot")) and isinstance(v, list):
                                    args.append(_to_tree_node(v))
                                else:
                                    args.append(v)

                    if not args and len(param_names) > 0:
                        try:
                            val = eval(f"({input_str})", globals(), scope)
                            if isinstance(val, tuple) and len(val) == len(param_names):
                                args = list(val)
                            else:
                                args = [val]
                        except Exception:
                            pass

                    expected = None
                    if output_str:
                        exp_scope = {}
                        try:
                            exec("expected = " + output_str, globals(), exp_scope)
                            expected = exp_scope.get("expected")
                        except Exception:
                            expected = output_str

                    actual = fn(*args)
                    actual_conv = actual
                    if isinstance(actual, ListNode):
                        actual_conv = _from_list_node(actual)
                    elif isinstance(actual, TreeNode):
                        actual_conv = _from_tree_node(actual)
                    elif actual is None and len(args) > 0 and isinstance(args[0], (list, dict, set)):
                        actual_conv = args[0]
                    elif isinstance(actual, int) and len(args) > 0 and isinstance(args[0], list):
                        if isinstance(expected, list):
                            actual_conv = args[0][:actual]

                    def _is_match(act, exp):
                        if exp is None:
                            return True
                        if act is None:
                            return exp == [] or exp == "" or exp == "null"
                        if isinstance(act, (int, float)) and isinstance(exp, (int, float)):
                            return abs(act - exp) < 1e-4
                        if isinstance(act, bool) and isinstance(exp, bool):
                            return act == exp
                        if isinstance(act, (list, tuple)) and isinstance(exp, (list, tuple)):
                            if len(act) != len(exp):
                                return False
                            return _normalize(act) == _normalize(exp)
                        s_act = str(act).strip().strip('"').strip("'")
                        s_exp = str(exp).strip().strip('"').strip("'")
                        if s_act == s_exp:
                            return True
                        try:
                            if abs(float(s_act) - float(s_exp)) < 1e-4:
                                return True
                        except Exception:
                            pass
                        return str(act).strip() == str(exp).strip()

                    passed = _is_match(actual_conv, expected)

                    def _format_result(v):
                        if isinstance(v, bool):
                            return "true" if v else "false"
                        if v is None:
                            return "null"
                        if isinstance(v, str):
                            return f'"{v}"'
                        if isinstance(v, (list, dict)):
                            return json.dumps(v)
                        return str(v)

                    print("__TEST_RESULT__:" + json.dumps({
                        "caseIndex": idx,
                        "passed": bool(passed),
                        "input": input_str,
                        "expected": _format_result(expected),
                        "actual": _format_result(actual_conv)
                    }))
                except Exception as ex:
                    print("__TEST_RESULT__:" + json.dumps({
                        "caseIndex": idx,
                        "passed": False,
                        "input": input_str,
                        "expected": output_str,
                        "actual": "Error: " + str(ex)
                    }))
    except Exception as e:
        print("Harness execution error: " + str(e), file=sys.stderr)
`;
      processed += harness;
    }
  } else if (lang === "javascript" || lang === "js" || lang === "node") {
    // If LeetCode test cases are provided for JavaScript
    if (validTestCases.length > 0 && !processed.includes("process.stdin") && !processed.includes("readline")) {
      const sanitizedCases = validTestCases.slice(0, 8);
      const paramList = metadata?.params?.map((p) => p.name) || [];
      const harness = `

// --- AUTO-GENERATED LEETCODE TEST HARNESS ---
(function() {
    try {
        if (typeof ListNode === 'undefined') {
            function ListNode(val, next) {
                this.val = (val===undefined ? 0 : val);
                this.next = (next===undefined ? null : next);
            }
        }
        if (typeof TreeNode === 'undefined') {
            function TreeNode(val, left, right) {
                this.val = (val===undefined ? 0 : val);
                this.left = (left===undefined ? null : left);
                this.right = (right===undefined ? null : right);
            }
        }

        const testSpecs = ${JSON.stringify(sanitizedCases)};
        const predefinedParams = ${JSON.stringify(paramList)};
        let targetFn = null;
        if (typeof Solution === 'function') {
            const s = new Solution();
            const proto = Object.getOwnPropertyNames(Solution.prototype).filter(p => p !== 'constructor');
            if (proto.length > 0) targetFn = s[proto[0]].bind(s);
        }
        if (!targetFn) {
            ${metadata?.name ? `if (typeof ${metadata.name} === 'function') targetFn = ${metadata.name};` : ""}
        }
        if (!targetFn) {
            const matches = ${JSON.stringify(code)}.match(/(?:var|const|let|function)\\s+([a-zA-Z0-9_]+)/g);
            if (matches) {
                for (const m of matches) {
                    const name = m.split(/\\s+/).pop();
                    try {
                        if (typeof eval(name) === 'function') {
                            targetFn = eval(name);
                            break;
                        }
                    } catch (e) {}
                }
            }
        }
        if (targetFn) {
            for (let i = 0; i < testSpecs.length; i++) {
                const tc = testSpecs[i];
                try {
                    const hasAssignments = /^[a-zA-Z0-9_]+\\s*=/.test(tc.input) || tc.input.includes("=");
                    const converted = tc.input.replace(/,\\s*([a-zA-Z0-9_]+)\\s*=/g, "; let $1 =");
                    const declLine = hasAssignments ? "let " + converted + ";" : "let rawInput = [" + tc.input + "];";
                    const runFn = new Function('fn', 'params', \`
                        function _to_list_node(arr) {
                            if (!Array.isArray(arr) || arr.length === 0) return null;
                            const dummy = new ListNode(0);
                            let cur = dummy;
                            for (const x of arr) {
                                cur.next = new ListNode(x);
                                cur = cur.next;
                            }
                            return dummy.next;
                        }
                        function _from_list_node(node) {
                            const res = [];
                            let cur = node;
                            const seen = new Set();
                            while (cur && !seen.has(cur) && res.length < 500) {
                                seen.add(cur);
                                res.push(cur.val);
                                cur = cur.next;
                            }
                            return res;
                        }

                        \${declLine}
                        let expected = null;
                        try {
                            expected = \${tc.output ? tc.output : "null"};
                        } catch(e) {
                            expected = \${JSON.stringify(tc.output || "")};
                        }

                        let actual;
                        let evaluatedArgs = [];
                        if (params && params.length > 0) {
                            try {
                                evaluatedArgs = params.map(p => eval(p));
                            } catch (e) {}
                        }
                        if (evaluatedArgs.length === 0) {
                            try {
                                const varNames = [...\\\`\${tc.input}\\\`.matchAll(/(?:^|;\\\\s*|\\\\n\\\\s*|,\\\\s*)([a-zA-Z0-9_]+)\\\\s*=/g)].map(m => m[1]);
                                if (varNames.length > 0) {
                                    evaluatedArgs = varNames.map(v => eval(v));
                                }
                            } catch (e) {}
                        }
                        if (evaluatedArgs.length === 0 && typeof rawInput !== 'undefined') {
                            evaluatedArgs = rawInput;
                        }

                        for (let k = 0; k < evaluatedArgs.length; k++) {
                            const pName = (params && params[k]) ? params[k].toLowerCase() : "";
                            if ((pName.includes("head") || pName.includes("list") || pName.includes("node")) && Array.isArray(evaluatedArgs[k])) {
                                evaluatedArgs[k] = _to_list_node(evaluatedArgs[k]);
                            }
                        }

                        actual = fn(...evaluatedArgs);

                        if (actual && typeof actual === 'object' && 'val' in actual && 'next' in actual) {
                            actual = _from_list_node(actual);
                        }

                        if (actual === undefined && evaluatedArgs.length > 0 && Array.isArray(evaluatedArgs[0])) {
                            actual = evaluatedArgs[0];
                        } else if (typeof actual === 'number' && evaluatedArgs.length > 0 && Array.isArray(evaluatedArgs[0]) && Array.isArray(expected)) {
                            actual = evaluatedArgs[0].slice(0, actual);
                        }

                        return { actual, expected };
                    \`);
                    const { actual, expected } = runFn(targetFn, predefinedParams);
                    const isMatch = (act, exp) => {
                        if (exp === null || exp === undefined) return true;
                        if ((act === null || (Array.isArray(act) && act.length === 0)) && (exp === null || (Array.isArray(exp) && exp.length === 0) || exp === "[]" || exp === "null")) return true;
                        if (typeof act === 'number' && typeof exp === 'number') {
                            return Math.abs(act - exp) < 1e-4;
                        }
                        if (Array.isArray(act) && Array.isArray(exp)) {
                            if (act.length !== exp.length) return false;
                            const s1 = JSON.stringify(act.slice().sort());
                            const s2 = JSON.stringify(exp.slice().sort());
                            return s1 === s2;
                        }
                        const sAct = String(act).trim().replace(/^["']|["']$/g, '');
                        const sExp = String(exp).trim().replace(/^["']|["']$/g, '');
                        if (sAct === sExp) return true;
                        try {
                            const nAct = Number(sAct);
                            const nExp = Number(sExp);
                            if (!isNaN(nAct) && !isNaN(nExp) && Math.abs(nAct - nExp) < 1e-4) return true;
                        } catch (e) {}
                        return JSON.stringify(act) === JSON.stringify(exp);
                    };
                    const passed = isMatch(actual, expected);
                    console.log("__TEST_RESULT__:" + JSON.stringify({
                        caseIndex: i + 1,
                        passed,
                        input: tc.input,
                        expected: JSON.stringify(expected),
                        actual: JSON.stringify(actual)
                    }));
                } catch (err) {
                    console.log("__TEST_RESULT__:" + JSON.stringify({
                        caseIndex: i + 1,
                        passed: false,
                        input: tc.input,
                        expected: tc.output,
                        actual: "Error: " + err.message
                    }));
                }
            }
        }
    } catch (e) {
        console.error("Test runner error:", e.message);
    }
})();
`;
      processed += harness;
    }
  }

  return processed;
};

/**
 * Extracts method name from code snippet across supported languages.
 */
export const detectMethodFromCode = (code) => {
  if (!code || typeof code !== "string") return null;
  const pyMatch = code.match(/def\s+([a-zA-Z0-9_]+)\s*\(/);
  if (pyMatch && pyMatch[1] !== "__init__") return pyMatch[1];

  const jsMatch = code.match(/(?:function\s+([a-zA-Z0-9_]+)|(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:function|\([^)]*\)\s*=>))/);
  if (jsMatch && (jsMatch[1] || jsMatch[2])) return jsMatch[1] || jsMatch[2];

  const javaMatch = code.match(/(?:public|private|protected|static|\s)+\s+(?:[a-zA-Z0-9_<>[\]]+)\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/);
  if (javaMatch && javaMatch[1] && !["main", "if", "for", "while", "switch"].includes(javaMatch[1])) {
    return javaMatch[1];
  }

  return null;
};

/**
 * Executes code using the free Wandbox Compiler API.
 */
export const executeCode = async ({
  language,
  code,
  stdin = "",
  testCases = [],
  metadata = null,
}) => {
  const lang = (language || "python").toLowerCase().trim();
  const compiler = COMPILER_MAP[lang] || COMPILER_MAP.python;

  // Auto-detect method from code to prevent executing mismatched test cases
  let effectiveTestCases = Array.isArray(testCases) ? [...testCases] : [];
  let effectiveMetadata = metadata;

  const detectedMethod = detectMethodFromCode(code);
  if (detectedMethod) {
    const isReverseTestCase = effectiveTestCases.some((tc) => tc && tc.input && tc.input.includes("head ="));
    const isMethodReverse = detectedMethod.toLowerCase().includes("reverse");

    // If test cases are for Reverse Linked List (head = ...) but the code is NOT reverseList (e.g. twoSum)
    if (isReverseTestCase && !isMethodReverse) {
      console.log(
        `[EXEC] Mismatch detected: Code defines "${detectedMethod}", but test cases are for Reverse Linked List. Auto-recovering test cases for "${detectedMethod}"...`
      );
      const matched = getTestCasesForProblem(detectedMethod);
      if (matched && matched.testCases && matched.testCases.length > 0) {
        effectiveTestCases = matched.testCases;
        effectiveMetadata = matched.metadata || effectiveMetadata;
      }
    } else if (effectiveTestCases.length === 0) {
      const matched = getTestCasesForProblem(detectedMethod);
      if (matched && matched.testCases && matched.testCases.length > 0) {
        effectiveTestCases = matched.testCases;
        effectiveMetadata = matched.metadata || effectiveMetadata;
      }
    }
  }

  const processedCode = preprocessCode(lang, code, effectiveTestCases, effectiveMetadata);
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      compiler,
      code: processedCode,
      stdin: stdin || "",
    });

    const options = {
      hostname: "wandbox.org",
      port: 443,
      path: "/api/compile.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "User-Agent": "AI-DSA-Mentor-Client/1.0",
      },
      timeout: 15000,
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        const executionTime = Date.now() - startTime;
        try {
          const result = JSON.parse(data);
          const compilerError = (result.compiler_error || "").trim();
          const programError = (result.program_error || "").trim();
          const rawOutput = (result.program_output || "").trim();

          // Parse structured test results if test harness ran
          const testResults = [];
          const cleanOutputLines = [];
          const lines = rawOutput.split("\n");

          for (const line of lines) {
            if (line.includes("__TEST_RESULT__:")) {
              try {
                const jsonStr = line.substring(line.indexOf("__TEST_RESULT__:") + "__TEST_RESULT__:".length).trim();
                testResults.push(JSON.parse(jsonStr));
              } catch (e) {}
            } else {
              cleanOutputLines.push(line);
            }
          }

          const hasTests = testResults.length > 0;
          const passedCount = testResults.filter((r) => r.passed).length;
          const totalCount = testResults.length;

          let status;
          if (compilerError) {
            status = "Compilation Error";
          } else if (programError && !hasTests) {
            status = "Runtime Error";
          } else if (hasTests) {
            status = passedCount === totalCount ? "Accepted" : "Wrong Answer";
          } else {
            status = result.status === "0" ? "Success" : "Runtime Error";
          }

          resolve({
            success: true,
            status,
            output: cleanOutputLines.join("\n").trim(),
            error: compilerError || programError,
            compilerOutput: (result.compiler_output || "").trim(),
            exitCode: parseInt(result.status || "0", 10),
            executionTime,
            language: lang,
            testResults: hasTests ? testResults : null,
            passedTestCases: hasTests ? passedCount : null,
            totalTestCases: hasTests ? totalCount : null,
          });
        } catch (parseErr) {
          resolve({
            success: false,
            status: "Execution Error",
            output: "",
            error: data || "Failed to parse compiler response.",
            executionTime,
            language: lang,
          });
        }
      });
    });

    req.on("timeout", () => {
      req.destroy();
      resolve({
        success: false,
        status: "Time Limit Exceeded",
        output: "",
        error: "Execution timed out (limit: 15 seconds).",
        executionTime: 15000,
        language: lang,
      });
    });

    req.on("error", (err) => {
      resolve({
        success: false,
        status: "Network Error",
        output: "",
        error: err.message || "Failed to reach code execution service.",
        executionTime: Date.now() - startTime,
        language: lang,
      });
    });

    req.write(postData);
    req.end();
  });
};
