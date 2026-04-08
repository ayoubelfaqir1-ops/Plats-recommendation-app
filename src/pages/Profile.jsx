import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { DIETARY_TAG_OPTIONS } from "../constants/dietaryTags";
import { getProfile, updateProfile } from "../services/profile.service";

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dietaryTags, setDietaryTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getProfile();

        setName(profile.name || "");
        setEmail(profile.email || "");
        setDietaryTags(profile.dietary_tags || []);
      } catch {
        setErrorMessage("Profile could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const toggleTag = (tagValue) => {
    setDietaryTags((currentTags) => {
      if (currentTags.includes(tagValue)) {
        return currentTags.filter((tag) => tag !== tagValue);
      }

      return [...currentTags, tagValue];
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateProfile({
        name,
        email,
        dietary_tags: dietaryTags,
      });

      await refreshUser();
      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Profile could not be updated."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 text-zinc-300 flex flex-col">
        <Navbar showSearch={false} />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <section className="mb-8">
            <p className="text-primary-400 uppercase tracking-[0.35em] text-xs font-bold mb-4">
              Profile
            </p>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Manage your account
                </h1>
                <p className="text-zinc-400 text-lg mt-3 max-w-2xl">
                  Update your personal details and dietary tags so the dish analysis
                  matches your profile.
                </p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                  Signed in as
                </p>
                <p className="text-white font-bold">{user?.name || "User"}</p>
                <p className="text-zinc-400 text-sm">{user?.email || email}</p>
              </div>
            </div>
          </section>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
            <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 shadow-2xl">
              {isLoading ? (
                <div className="py-16 text-center text-zinc-400 text-lg">
                  Loading profile...
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Personal information
                    </h2>
                    <p className="text-zinc-400">
                      Keep your basic account details up to date.
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <label className="block">
                      <span className="block text-sm font-semibold text-zinc-300 mb-3">
                        Full name
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500"
                        placeholder="Your full name"
                      />
                    </label>

                    <label className="block">
                      <span className="block text-sm font-semibold text-zinc-300 mb-3">
                        Email address
                      </span>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>

                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Dietary tags
                      </h3>
                      <p className="text-zinc-400">
                        Choose the tags that describe your dietary preferences.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {DIETARY_TAG_OPTIONS.map((tag) => {
                        const isSelected = dietaryTags.includes(tag.value);

                        return (
                          <button
                            key={tag.value}
                            type="button"
                            onClick={() => toggleTag(tag.value)}
                            className={`rounded-full border px-5 py-3 text-sm font-bold transition-all ${
                              isSelected
                                ? "border-primary-500 bg-primary-500 text-white shadow-[0_0_20px_rgba(255,67,20,0.3)]"
                                : "border-white/10 bg-zinc-900 text-zinc-300 hover:border-white/20 hover:bg-zinc-800"
                            }`}
                          >
                            {tag.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {successMessage ? (
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-emerald-300">
                      {successMessage}
                    </div>
                  ) : null}

                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-300">
                      {errorMessage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-3 rounded-2xl bg-primary-500 px-6 py-3 font-bold text-white transition-all hover:bg-primary-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <i className="ph-bold ph-floppy-disk text-lg"></i>
                    {isSaving ? "Saving..." : "Save changes"}
                  </button>
                </form>
              )}
            </section>

            <aside className="space-y-6">
              <section className="rounded-[2.5rem] border border-white/10 bg-zinc-900 p-8 shadow-xl">
                <div className="h-16 w-16 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-300 text-2xl mb-5">
                  <i className="ph-fill ph-user"></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Profile summary
                </h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-zinc-500 uppercase tracking-[0.3em] mb-2">
                      Name
                    </p>
                    <p className="text-zinc-200">{name || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-[0.3em] mb-2">
                      Email
                    </p>
                    <p className="text-zinc-200 break-all">{email || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 uppercase tracking-[0.3em] mb-2">
                      Tags selected
                    </p>
                    <p className="text-zinc-200">{dietaryTags.length}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8">
                <h2 className="text-xl font-bold text-white mb-3">
                  Recommendation note
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  These tags are used when the AI compares dishes with your dietary
                  preferences. Keep them accurate for better recommendations.
                </p>
              </section>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
