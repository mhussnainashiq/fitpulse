const KEYS = {
  users: "fitpulse_users",
  session: "fitpulse_session",
  workouts: "fitpulse_workouts",
  goals: "fitpulse_goals",
  nutrition: "fitpulse_nutrition",
  progress: "fitpulse_progress"
};

function read(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getUsers() {
  return read(KEYS.users, []);
}

export function saveUsers(users) {
  write(KEYS.users, users);
}

export function getSession() {
  return localStorage.getItem(KEYS.session);
}

export function setSession(userId) {
  localStorage.setItem(KEYS.session, userId);
}

export function clearSession() {
  localStorage.removeItem(KEYS.session);
}

export function getCurrentUser() {
  const sessionId = getSession();

  if (!sessionId) {
    return null;
  }

  return getUsers().find((user) => user.id === sessionId) || null;
}

export function updateCurrentUser(updates) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    throw new Error("No active user.");
  }

  const users = getUsers();

  const updatedUser = {
    ...currentUser,
    ...updates
  };

  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  );

  saveUsers(updatedUsers);

  return updatedUser;
}

function userKey(type) {
  const user = getCurrentUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  return `${KEYS[type]}_${user.id}`;
}

export function getUserData(type) {
  return read(userKey(type), []);
}

export function saveUserData(type, data) {
  write(userKey(type), data);
}

export function createUserData(type, data) {
  const items = getUserData(type);

  const item = {
    ...data,
    _id: createId(),
    userId: getCurrentUser().id,
    createdAt: new Date().toISOString()
  };

  saveUserData(type, [item, ...items]);

  return item;
}

export function updateUserData(type, id, updates) {
  const items = getUserData(type);

  const updatedItem = items.find((item) => item._id === id);

  if (!updatedItem) {
    throw new Error("Item not found.");
  }

  const result = {
    ...updatedItem,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveUserData(
    type,
    items.map((item) => (item._id === id ? result : item))
  );

  return result;
}

export function removeUserData(type, id) {
  const items = getUserData(type);

  saveUserData(
    type,
    items.filter((item) => item._id !== id)
  );
}

export function clearFitPulseStorage() {
  Object.values(KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });

  Object.keys(localStorage)
    .filter((key) =>
      [
        KEYS.workouts,
        KEYS.goals,
        KEYS.nutrition,
        KEYS.progress
      ].some((prefix) => key.startsWith(`${prefix}_`))
    )
    .forEach((key) => localStorage.removeItem(key));
}

export { createId };