import {
  createUserData,
  getUserData,
  removeUserData,
  updateUserData
} from "./storage";

export const workoutService = {
  async list() {
    return getUserData("workouts");
  },

  async get(id) {
    const workouts = getUserData("workouts");

    const workout = workouts.find((item) => item._id === id);

    if (!workout) {
      throw new Error("Workout not found.");
    }

    return workout;
  },

  async create(payload) {
    return createUserData("workouts", {
      ...payload,
      duration: Number(payload.duration),
      caloriesBurned: Number(payload.caloriesBurned)
    });
  },

  async update(id, payload) {
    return updateUserData("workouts", id, {
      ...payload,
      duration: Number(payload.duration),
      caloriesBurned: Number(payload.caloriesBurned)
    });
  },

  async remove(id) {
    removeUserData("workouts", id);

    return {
      success: true
    };
  }
};