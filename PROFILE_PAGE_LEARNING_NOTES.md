# Profile Page Learning Notes

This file explains the profile feature changes step by step.

The goal was:
- add a profile page
- let the user see and edit their information
- let the user update dietary tags from the backend enum list
- add a dropdown menu on the profile image with `Profile` and `Logout`
- keep the UI aligned with the current app style

---

## 1. New Route In `App.jsx`

File:
- `src/App.jsx`

What changed:
- added `Profile` import
- added a new route:

```jsx
<Route path="/profile" element={<Profile />} />
```

- added a redirect from `/` to `/home`:

```jsx
<Route path="/" element={<Navigate to="/home" replace />} />
```

Why:
- React Router needs a route for every page
- without this route, `/profile` would not render anything
- redirecting `/` to `/home` makes the app entry point clear

What to learn:
- a route maps a URL path to a component
- `Navigate` is used when you want to redirect to another route

---

## 2. New `Profile.jsx` Page

File:
- `src/pages/Profile.jsx`

This is the main feature file.

What it does:
- loads the current profile from the backend
- displays name, email, and dietary tags
- lets the user update them
- shows success or error messages
- refreshes the auth user after save

### Why `useState` was used here

The form needs values that can change while the user types:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [dietaryTags, setDietaryTags] = useState([]);
```

Why not use normal variables?
- normal variables do not trigger React re-render
- state tells React that the UI should update

Example:
- when the user types in the name input, `setName(...)` runs
- React re-renders the component
- the input value on screen stays in sync with state

This is called a **controlled input**.

---

## 3. Loading Profile Data With `useEffect`

In `Profile.jsx`:

```jsx
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
```

Why `useEffect` was used:
- the profile must be loaded when the page opens
- fetching data is a side effect
- `useEffect(..., [])` runs once after the component is mounted

What to learn:
- use `useEffect` when something should happen after render
- common examples: API calls, event listeners, timers

Why the dependency array is empty:
- `[]` means run once on first render
- that is enough for initial profile loading

---

## 4. Service Layer For Profile API

File:
- `src/services/profile.service.js`

What changed:

```js
export const getProfile = () => api.get("/profile");
export const updateProfile = (profileData) => api.patch("/profile", profileData);
```

Why:
- components should not contain raw API URLs everywhere
- services make the code easier to read
- `Profile.jsx` can say `getProfile()` instead of building the request itself

What to learn:
- services separate UI logic from HTTP logic
- this makes code easier to reuse and test

---

## 5. Adding `PATCH` Support In `api.js`

File:
- `src/services/api.js`

What changed:

```js
api.patch = async (url, data = {}) => {
  const response = await api.request({
    url,
    method: "PATCH",
    data,
  });

  return response;
};
```

Why:
- the backend profile update endpoint uses `PATCH`
- the frontend API helper already had `get` and `post` behavior through Axios
- we needed a simple way to send profile updates

What to learn:
- `PATCH` is usually used for partial update
- `PUT` usually means replace the whole resource

In this case:
- we are updating some profile fields, not recreating the whole user

---

## 6. Dietary Tags Constant

File:
- `src/constants/dietaryTags.js`

What changed:
- created one frontend list that matches the backend enum values:

```js
export const DIETARY_TAG_OPTIONS = [
  { value: "vegan", label: "Vegan" },
  { value: "no_sugar", label: "No Sugar" },
  { value: "no_cholesterol", label: "No Cholesterol" },
  { value: "gluten_free", label: "Gluten Free" },
  { value: "no_lactose", label: "No Lactose" },
];
```

Why:
- the backend enum in `DietaryTag.php` is the source of truth
- the frontend needs readable labels and exact values to send back
- keeping this in one constant avoids repeating strings in the page

What to learn:
- constants are useful when values are reused
- it reduces typos and keeps data consistent

---

## 7. Toggle Logic For Tags

In `Profile.jsx`:

```jsx
const toggleTag = (tagValue) => {
  setDietaryTags((currentTags) => {
    if (currentTags.includes(tagValue)) {
      return currentTags.filter((tag) => tag !== tagValue);
    }

    return [...currentTags, tagValue];
  });
};
```

Why this pattern was used:
- dietary tags are stored as an array
- clicking a tag should either:
  - remove it if already selected
  - add it if not selected

What to learn:
- this is **immutable update**
- we do not modify the original array directly
- instead, we return a new array

Why that matters:
- React state updates work best when you create new arrays/objects
- direct mutation can cause bugs and stale UI

Examples:
- current tags: `["vegan"]`
- click `gluten_free`
- new tags: `["vegan", "gluten_free"]`

- current tags: `["vegan", "gluten_free"]`
- click `vegan`
- new tags: `["gluten_free"]`

---

## 8. Submit Handler

In `Profile.jsx`:

```jsx
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
```

Why each part exists:

`event.preventDefault()`
- stops the browser from doing normal form submission
- lets React handle the submit with JavaScript

`setIsSaving(true)`
- used to disable the button and show `Saving...`

`setSuccessMessage("")` and `setErrorMessage("")`
- clears old messages before a new save attempt

`await updateProfile(...)`
- sends the changed data to the backend

`await refreshUser()`
- updates the global auth user after save
- this is important because the navbar uses auth context user data

What to learn:
- if local page state and global app state both use the same data, you may need to refresh both

---

## 9. Auth Context: `refreshUser`

File:
- `src/context/AuthContext.jsx`

What changed:

```jsx
const refreshUser = async () => {
  const profile = await api.get("/profile");
  setUser(profile);
  return profile;
};
```

And it was exposed in the context value:

```jsx
value={{
  user,
  loading,
  login,
  logout,
  refreshUser,
  setUser,
  isAuthenticated: !!user,
}}
```

Why:
- the navbar dropdown shows current user info
- if the user changes name or email on the profile page, the navbar should update too
- `refreshUser()` gives one reusable way to reload the current user

What to learn:
- context is useful for app-wide data like logged-in user
- helper functions can also live inside context, not only raw values

---

## 10. Navbar Dropdown Menu

File:
- `src/components/Navbar.jsx`

What changed:
- avatar button now toggles a small dropdown menu
- menu contains:
  - user name
  - user email
  - `Profile` link
  - `Logout` button

Important parts:

```jsx
const [menuOpen, setMenuOpen] = useState(false);
```

This controls whether the dropdown is shown.

```jsx
onClick={() => setMenuOpen((open) => !open)}
```

This toggles the menu:
- if open -> close it
- if closed -> open it

Why:
- dropdown visibility is UI state
- it changes based on user clicks

What to learn:
- this is a simple boolean UI state pattern
- one state variable can control conditional rendering

---

## 11. Optional Navbar Search

File:
- `src/components/Navbar.jsx`

What changed:

```jsx
const Navbar = ({ search = "", setSearch, showSearch = true }) => {
```

Why:
- home page needs search
- profile page does not need search
- same navbar component can be reused in both places

On the profile page:

```jsx
<Navbar showSearch={false} />
```

What to learn:
- props can change component behavior
- this is better than duplicating almost identical navbars

---

## 12. Shared Layout On Detail Page

File:
- `src/pages/PlatDetails.jsx`

What changed:
- replaced the custom top bar with the shared `Navbar`
- wrapped the page with `ProtectedRoute`

Why:
- now the profile/logout menu appears on detail page too
- keeps navigation consistent across the app

What to learn:
- shared components reduce duplication
- when two pages should feel the same, reuse the same layout piece

---

## 13. `ProtectedRoute`

Used in:
- `src/pages/Home.jsx`
- `src/pages/Profile.jsx`
- `src/pages/PlatDetails.jsx`

What it does:
- if auth is still loading -> show full page loader
- if no user -> redirect to login
- otherwise render the page

Why:
- profile page should only be available for logged-in users
- same for home and plat details

What to learn:
- route protection is just conditional rendering around a page
- you do not need a very complex system for basic auth protection

---

## 14. Conditional Rendering

This pattern is used a lot in `Profile.jsx`:

```jsx
{isLoading ? (
  <div>Loading profile...</div>
) : (
  <form>...</form>
)}
```

and:

```jsx
{successMessage ? <div>...</div> : null}
{errorMessage ? <div>...</div> : null}
```

Why:
- UI should change based on state
- loading, success, and error are different states

What to learn:
- React usually works by describing UI for each state
- not by manually showing/hiding elements with DOM code

---

## 15. New Concept: `useMemo`

`useMemo` was introduced briefly in `Navbar.jsx` for computing user initials, then removed.

The first idea looked like this:

```jsx
const initials = useMemo(() => {
  if (!user?.name) {
    return "RB";
  }

  return user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}, [user?.name]);
```

### What `useMemo` does

It memoizes a computed value.

Meaning:
- React remembers the result
- it only recomputes when dependencies change

So if `user.name` does not change:
- React can reuse the previous initials value

### Why developers use it

Usually for:
- expensive calculations
- values that would be wasteful to recompute often

Examples:
- filtering a very large list
- sorting a big dataset
- heavy transformations

### Why it was removed here

Because this calculation is tiny:
- split the name
- take first letters
- uppercase them

That is cheap, readable, and does not need memoization.

Also, the React compiler lint rule complained about preserving the manual memoization.

So the simpler version was better:

```jsx
let initials = "RB";

if (user?.name) {
  initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
```

### The learning point

Do not use `useMemo` just because it exists.

Use it when:
- the computation is expensive, or
- the memoized value helps prevent unnecessary work in a real way

Do not use it when:
- the calculation is simple
- it makes code harder to understand
- it solves no real performance problem

Simple code is usually better than “advanced-looking” code.

---

## 16. Why The UI Style Matches The App

The profile page reused the same visual language already present in the project:
- dark zinc background
- glass cards
- rounded large panels
- orange primary accent
- bold headings

Why:
- a new page should feel like part of the same product
- reusing visual patterns is as important as reusing code patterns

What to learn:
- consistency matters in frontend development
- even if a page is new, it should look like it belongs to the same app

---

## 17. File-by-File Summary

### `src/App.jsx`
- added `/profile`
- added `/ -> /home` redirect

### `src/pages/Profile.jsx`
- new page
- loads profile
- edits name, email, dietary tags
- saves profile
- shows feedback messages

### `src/services/profile.service.js`
- created `getProfile()`
- created `updateProfile()`

### `src/services/api.js`
- added `api.patch(...)`

### `src/constants/dietaryTags.js`
- added frontend list matching backend enum values

### `src/context/AuthContext.jsx`
- added `refreshUser()`
- exposes it through context

### `src/components/Navbar.jsx`
- added dropdown menu
- added `Profile` link
- added `Logout` button
- added optional search behavior

### `src/pages/PlatDetails.jsx`
- now uses shared navbar
- now protected with `ProtectedRoute`

---

## 18. Most Important Lessons

1. Use state for values that affect the UI.
2. Use `useEffect` for work that happens after render, like API loading.
3. Keep API requests in service files.
4. Use context for shared app-wide user data.
5. Update arrays immutably.
6. Prefer simple code over advanced code when the advanced version gives no real benefit.
7. `useMemo` is a tool, not a default pattern.

---

## 19. If You Want To Study The Feature In Order

Read the files in this order:

1. `src/App.jsx`
2. `src/context/AuthContext.jsx`
3. `src/services/api.js`
4. `src/services/profile.service.js`
5. `src/constants/dietaryTags.js`
6. `src/components/Navbar.jsx`
7. `src/pages/Profile.jsx`

That order goes from:
- routing
- shared auth state
- API layer
- reusable data
- shared UI
- final page logic

