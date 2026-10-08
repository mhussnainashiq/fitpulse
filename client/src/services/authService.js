import {
  clearSession,
  createId,
  getCurrentUser,
  getUsers,
  saveUsers,
  setSession,
  updateCurrentUser
} from "./storage";

export const authService = {
  async register(payload) {
    const users = getUsers();

    const email = payload.email.trim().toLowerCase();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === email
    );

    if (existingUser) {
      throw new Error("An account with this email already exists.");
    }

    const user = {
      id: createId(),
      name: payload.name.trim(),
      email,
      password: payload.password,
      age: "",
      height: "",
      weight: "",
      fitnessLevel: 12,
      dailyCalorieGoal: 2200,
      weeklyWorkoutGoal: 6,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, user]);

    setSession(user.id);

    return {
      user,
      token: user.id
    };
  },

  async login(payload) {
    const email = payload.email.trim().toLowerCase();

    const user = getUsers().find(
      (item) =>
        item.email.toLowerCase() === email &&
        item.password === payload.password
    );

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    setSession(user.id);

    return {
      user,
      token: user.id
    };
  },

  async me() {
    const user = getCurrentUser();

    if (!user) {
      throw new Error("Session expired.");
    }

    return {
      user
    };
  },

  async updateProfile(payload) {
    const updatedUser = updateCurrentUser({
      ...payload,
      age: payload.age === "" ? "" : Number(payload.age),
      height: payload.height === "" ? "" : Number(payload.height),
      weight: payload.weight === "" ? "" : Number(payload.weight),
      fitnessLevel: Number(payload.fitnessLevel),
      dailyCalorieGoal: Number(payload.dailyCalorieGoal),
      weeklyWorkoutGoal: Number(payload.weeklyWorkoutGoal)
    });

    return {
      user: updatedUser
    };
  },

  async logout() {
    clearSession();
  }
};