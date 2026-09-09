import { useState } from "react";

import {
  MapPin,
  CalendarDays,
  Pencil,
  ExternalLink,
  Camera,
  Image,
  X,
} from "lucide-react";

import {
  updateProfile,
  uploadAvatar,
  uploadBanner,
} from "../../api/profile";

const ProfileHeader = ({
  user,
  onProfileUpdate,
  isOwnProfile = true,
  isFollowing = false,
  onFollow,
  onUnfollow,
}) => {
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState("");

  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [bannerError, setBannerError] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    location: user.location || "",
    linkedin: user.socialLinks?.linkedin || "",
    github: user.socialLinks?.github || "",
    leetcode: user.socialLinks?.leetcode || "",
    portfolio: user.socialLinks?.portfolio || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ================= Edit Profile ================= */

  const handleEdit = () => {
    if (!isOwnProfile) return;

    setFormData({
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
      linkedin: user.socialLinks?.linkedin || "",
      github: user.socialLinks?.github || "",
      leetcode: user.socialLinks?.leetcode || "",
      portfolio: user.socialLinks?.portfolio || "",
    });

    setError("");
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!isOwnProfile) return;

    setSaving(true);
    setError("");

    try {
      const data = await updateProfile({
        name: formData.name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        socialLinks: {
          linkedin: formData.linkedin,
          github: formData.github,
          leetcode: formData.leetcode,
          portfolio: formData.portfolio,
        },
      });

      onProfileUpdate(data.user);

      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);

      setError(
        error.message || "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  /* ================= Avatar Upload ================= */

  const handleAvatarChange = async (e) => {
    if (!isOwnProfile) return;

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setAvatarError("");

    if (!file.type.startsWith("image/")) {
      setAvatarError("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingAvatar(true);

      const data = await uploadAvatar(file);

      onProfileUpdate(data.user);
    } catch (error) {
      console.error("Avatar upload error:", error);

      setAvatarError(
        error.message || "Failed to upload profile picture"
      );
    } finally {
      setUploadingAvatar(false);

      e.target.value = "";
    }
  };

  /* ================= Banner Upload ================= */

  const handleBannerChange = async (e) => {
    if (!isOwnProfile) return;

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setBannerError("");

    if (!file.type.startsWith("image/")) {
      setBannerError("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setBannerError("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    try {
      setUploadingBanner(true);

      const data = await uploadBanner(file);

      onProfileUpdate(data.user);
    } catch (error) {
      console.error("Banner upload error:", error);

      setBannerError(
        error.message || "Failed to upload banner"
      );
    } finally {
      setUploadingBanner(false);

      e.target.value = "";
    }
  };

  return (
    <>
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* ================= Banner ================= */}

        <div className="relative h-44 bg-gradient-to-r from-violet-100 via-purple-50 to-indigo-100">

          {user.banner && (
            <img
              src={user.banner}
              alt=""
              className="h-full w-full object-cover"
            />
          )}

          {/* Change Banner - Own Profile Only */}

          {isOwnProfile && (
            <>
              <input
                id="banner-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerChange}
                disabled={uploadingBanner}
              />

              <label
                htmlFor="banner-upload"
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  cursor-pointer
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-white/70
                  bg-white/90
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-700
                  shadow-sm
                  backdrop-blur
                  transition
                  hover:bg-white
                "
              >
                <Image size={16} />

                {uploadingBanner
                  ? "Uploading..."
                  : "Change Banner"}
              </label>

              {bannerError && (
                <p className="absolute right-4 top-16 text-xs text-red-500">
                  {bannerError}
                </p>
              )}
            </>
          )}
        </div>

        {/* ================= Profile Content ================= */}

        <div className="px-8 pb-6">

          {/* Avatar + Action */}

          <div className="flex items-end justify-between">

            {/* Avatar */}

            <div className="relative z-10 -mt-14">

              <div
                className="
                  h-28
                  w-28
                  overflow-hidden
                  rounded-full
                  border-[5px]
                  border-white
                  bg-white
                  shadow-md
                "
              >
                <img
                  src={user.profilePicture || user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />

                {uploadingAvatar && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-900/50">
                    <span className="text-xs font-medium text-white">
                      Uploading...
                    </span>
                  </div>
                )}
              </div>


              {/* Avatar Upload - Own Profile Only */}

              {isOwnProfile && (
                <>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                    disabled={uploadingAvatar}
                  />

                  <label
                    htmlFor="avatar-upload"
                    aria-label="Change profile photo"
                    className="
                      absolute
                      bottom-0
                      right-[-4px]
                      flex
                      h-8
                      w-8
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      text-slate-600
                      shadow-sm
                      transition
                      hover:bg-violet-50
                      hover:text-violet-600
                    "
                  >
                    <Camera size={15} />
                  </label>
                </>
              )}

              {/* Avatar Error */}

              {isOwnProfile && avatarError && (
                <p className="absolute left-0 top-full mt-2 w-52 text-xs text-red-500">
                  {avatarError}
                </p>
              )}

            </div>

            {/* ================= Action Button ================= */}

            {isOwnProfile ? (
              <button
                type="button"
                onClick={handleEdit}
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-violet-200
                  bg-violet-50
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-violet-600
                  transition
                  hover:bg-violet-100
                "
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  isFollowing
                    ? onUnfollow?.(user._id)
                    : onFollow?.(user._id)
                }
                className={`
                  group
                  mt-4
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  transition
                  ${
                    isFollowing
                      ? "border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                      : "border-violet-200 bg-violet-50 text-violet-600 hover:bg-violet-100"
                  }
                `}
              >
                {isFollowing ? (
                  <>
                    <span className="group-hover:hidden">
                      Following
                    </span>

                    <span className="hidden group-hover:inline">
                      Unfollow
                    </span>
                  </>
                ) : (
                  "Follow"
                )}
              </button>
            )}

          </div>

          {/* ================= Main Information ================= */}

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            {/* User Information */}

            <div className="min-w-0">

              {/* Name */}

              <h1 className="text-2xl font-bold text-slate-900">
                {user.name}
              </h1>

              {/* Username */}

              <p className="mt-0.5 text-sm text-slate-500">
                {user.username}
              </p>

              {/* Bio */}

              <p className="mt-3 max-w-2xl text-sm leading-5 text-slate-600">
                {user.bio}
              </p>

              {/* Location + Joined */}

              <div className="mt-3 flex flex-wrap items-center gap-5 text-sm text-slate-500">

                <div className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  <span>{user.location}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CalendarDays size={16} />

                  <span>
                    Joined{" "}
                    {user.joined ||
                      new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                  </span>
                </div>

              </div>

              {/* ================= Social Links ================= */}

              <div className="mt-4 flex items-center gap-2">

                {/* LinkedIn */}

                {user.socialLinks?.linkedin && (
                  <a
                    href={user.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      border border-slate-200
                      text-xs font-bold
                      text-slate-500
                      transition
                      hover:border-violet-200
                      hover:bg-violet-50
                      hover:text-violet-600
                    "
                  >
                    LN
                  </a>
                )}

                {/* GitHub */}

                {user.socialLinks?.github && (
                  <a
                    href={user.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      border border-slate-200
                      text-xs font-bold
                      text-slate-500
                      transition
                      hover:border-violet-200
                      hover:bg-violet-50
                      hover:text-violet-600
                    "
                  >
                    GH
                  </a>
                )}

                {/* LeetCode */}

                {user.socialLinks?.leetcode && (
                  <a
                    href={user.socialLinks.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LeetCode"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      border border-slate-200
                      text-xs font-bold
                      text-slate-500
                      transition
                      hover:border-violet-200
                      hover:bg-violet-50
                      hover:text-violet-600
                    "
                  >
                    LC
                  </a>
                )}

                {/* Portfolio */}

                {user.socialLinks?.portfolio && (
                  <a
                    href={user.socialLinks.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Portfolio"
                    className="
                      flex h-9 w-9
                      items-center justify-center
                      rounded-lg
                      border
                      border-slate-200
                      text-slate-500
                      transition
                      hover:border-violet-200
                      hover:bg-violet-50
                      hover:text-violet-600
                    "
                  >
                    <ExternalLink size={17} />
                  </a>
                )}

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= Edit Profile Modal ================= */}

      {isOwnProfile && isEditing && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-900/40
            px-4
            backdrop-blur-sm
          "
        >
          <div
            className="
              max-h-[90vh]
              w-full
              max-w-2xl
              overflow-y-auto
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-xl
            "
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Edit Profile
                </h2>

                <p className="mt-0.5 text-sm text-slate-500">
                  Update your profile information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                "
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}

            <form onSubmit={handleSave}>

              <div className="space-y-5 px-6 py-5">

                {/* Error */}

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* Name */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={50}
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      transition
                      focus:border-violet-400
                      focus:ring-2
                      focus:ring-violet-100
                    "
                  />
                </div>

                {/* Username */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    minLength={3}
                    maxLength={30}
                    placeholder="arvindgoyal"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      transition
                      focus:border-violet-400
                      focus:ring-2
                      focus:ring-violet-100
                    "
                  />
                </div>

                {/* Bio */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    maxLength={160}
                    rows={3}
                    placeholder="Tell people a little about yourself..."
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      transition
                      focus:border-violet-400
                      focus:ring-2
                      focus:ring-violet-100
                    "
                  />
                </div>

                {/* Location */}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="India"
                    className="
                      w-full
                      rounded-lg
                      border
                      border-slate-200
                      px-3
                      py-2.5
                      text-sm
                      outline-none
                      transition
                      focus:border-violet-400
                      focus:ring-2
                      focus:ring-violet-100
                    "
                  />
                </div>

                {/* Social Links */}

                <div>

                  <h3 className="mb-3 text-sm font-semibold text-slate-900">
                    Social Links
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2">

                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                      className="
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                      "
                    />

                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="GitHub URL"
                      className="
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                      "
                    />

                    <input
                      type="url"
                      name="leetcode"
                      value={formData.leetcode}
                      onChange={handleChange}
                      placeholder="LeetCode URL"
                      className="
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                      "
                    />

                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio URL"
                      className="
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2.5
                        text-sm
                        outline-none
                        transition
                        focus:border-violet-400
                        focus:ring-2
                        focus:ring-violet-100
                      "
                    />

                  </div>
                </div>

              </div>

              {/* Modal Footer */}

              <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={saving}
                  className="
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-slate-600
                    transition
                    hover:bg-slate-50
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    rounded-lg
                    bg-violet-600
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-violet-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeader;