# LeetCode dataset builder

Exports publicly accessible LeetCode problem data to a resumable JSON array. Each record keeps both original HTML and a useful structured form for search, RAG, analysis, or downstream cleanup.

## Run

```powershell
npm run scrape
```

```powershell
# Small smoke test
node fetchLeetCode.js --limit=5 --output=sample-problems.json

# Continue an interrupted run with a gentler pace
node fetchLeetCode.js --delay=1200

# Start a fresh file and include entries listed as premium
node fetchLeetCode.js --no-resume --include-premium --output=leetcode-problems.json
```

The scraper saves after every record and skips existing slugs when resumed. Premium listings can be included, but detailed content may not be available without authorized access.

## Fields captured

Problem number, IDs, title, slug/URL, difficulty, premium status, category, votes, acceptance rate, tags, raw statement HTML, normalized text, parsed sections, constraints, examples, test cases, hints, similar questions, language starter code, metadata/stats, and editor/runtime configuration.

`statementHtml` is retained because formatting differs between problems; parsed constraints/examples are best-effort convenience fields. Respect LeetCode's Terms of Service, robots policy, and rate limits when collecting or redistributing data.

## Java solution dataset

`generateJavaSolutions.js` creates original Java 17 solutions from the local problem data using a local Ollama model. It writes a separate, resumable `leetcode-java-solutions.json`, leaving `leetcode-problems.json` unchanged. Every solution record includes an approach, algorithm, proof sketch, complexity, LeetCode-ready Java code, and an `embeddingText` field.

The generator defaults to `qwen3:8b`. Pull it only if it is not already installed, then start with a small quality check:

```powershell
ollama pull qwen3:8b
node generateJavaSolutions.js --limit=5
```

Run the entire dataset after reviewing the sample:

```powershell
npm run generate:java
```

The generator connects to `http://127.0.0.1:11434` by default. Set `OLLAMA_HOST` or pass `--endpoint=http://host:11434` when Ollama runs elsewhere; use `--model=your-model-name` to choose a different local model. It saves after each completed problem and retries skipped entries on the next run. Generated code is marked `unverified_generated`; compile/run validation should be added before using it as a correctness benchmark.
