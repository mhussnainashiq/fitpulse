import { getUserData } from "./storage";

function getStartOfWeek() {
  const date = new Date();

  const day = date.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + difference);
  date.setHours(0, 0, 0, 0);

  return date;
}

function getDayName(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short"
  });
}

export const dashboardService = {
  async summary() {
    const workouts = getUserData("workouts");
    const progress = getUserData("progress");

    const startOfWeek = getStartOfWeek();

    const weeklyWorkouts = workouts.filter(
      (workout) => new Date(workout.date) >= startOfWeek
    );

    const weeklyCalories = weeklyWorkouts.reduce(
      (total, workout) => total + Number(workout.caloriesBurned || 0),
      0
    );

    const weeklyActiveMinutes = weeklyWorkouts.reduce(
      (total, workout) => total + Number(workout.duration || 0),
      0
    );

    const weeklySteps = progress
      .filter((item) => new Date(item.date) >= startOfWeek)
      .reduce((total, item) => total + Number(item.steps || 0), 0);

    const chartData = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);

      date.setDate(startOfWeek.getDate() + i);

      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const dayWorkouts = workouts.filter((workout) => {
        const workoutDate = new Date(workout.date);

        return workoutDate >= dayStart && workoutDate <= dayEnd;
      });

      chartData.push({
        day: getDayName(date),
        calories: dayWorkouts.reduce(
          (total, workout) =>
            total + Number(workout.caloriesBurned || 0),
          0
        ),
        workouts: dayWorkouts.length
      });
    }

    const recentWorkouts = [...workouts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    return {
      stats: {
        caloriesBurned: weeklyCalories,
        activeMinutes: weeklyActiveMinutes,
        steps: weeklySteps,
        workouts: weeklyWorkouts.length
      },

      recentWorkouts,

      weeklyCalories: chartData
    };
  }
};