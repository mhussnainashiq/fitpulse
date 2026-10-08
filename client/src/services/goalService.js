import {
  createUserData,
  getUserData,
  removeUserData,
  updateUserData
} from "./storage";

export const goalService = {
  async list() {
    return getUserData("goals");
  },

  async create(payload) {
    return createUserData("goals", {
      ...payload,
      target: Number(payload.target),
      current: Number(payload.current)
    });
  },

  async update(id, payload) {
    return updateUserData("goals", id, {
      ...payload,
      target: Number(payload.target),
      current: Number(payload.current)
    });
  },

  async remove(id) {
    removeUserData("goals", id);

    return {
      success: true
    };
  }
};