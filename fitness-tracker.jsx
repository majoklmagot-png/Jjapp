import { useState } from "react";

const workoutDays = [
  {
    id: 1,
    label: "Day 1",
    name: "Chest + Triceps",
    emoji: "💪",
    color: "#FF6B35",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "6–8" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "8–10" },
      { name: "Chest Fly", sets: 3, reps: "10–12" },
      { name: "Tricep Pushdowns", sets: 3, reps: "10–12" },
      { name: "Dips", sets: 3, reps: "8–10" },
    ],
  },
  {
    id: 2,
    label: "Day 2",
    name: "Back + Biceps",
    emoji: "🏋🏾‍♂️",
    color: "#4ECDC4",
    exercises: [
      { name: "Pull-ups (or assisted)", sets: 4, reps: "6–10" },
      { name: "Barbell Rows", sets: 3, reps: "8–10" },
      { name: "Lat Pulldown", sets: 3, reps: "10–12" },
      { name: "Dumbbell Curls", sets: 3, reps: "10–12" },
      { name: "Hammer Curls", sets: 3, reps: "10–12" },
    ],
  },
  {
    id: 3,
    label: "Day 3",
    name: "Rest / Cardio",
    emoji: "🚶🏾",
    color: "#A8E063",
    exercises: [
      { name: "Incline Walk or Light Jog", sets: 1, reps: "20–30 min" },
    ],
  },
  {
    id: 4,
    label: "Day 4",
    name: "Legs",
    emoji: "🦵🏾",
    color: "#9B59B6",
    exercises: [
      { name: "Squats", sets: 4, reps: "6–8" },
      { name: "Leg Press", sets: 3, reps: "10–12" },
      { name: "Hamstring Curls", sets: 3, reps: "10–12" },
      { name: "Calf Raises", sets: 4, reps: "12–15" },
    ],
  },
  {
    id: 5,
    label: "Day 5",
    name: "Shoulders + Abs",
    emoji: "🏅",
    color: "#F7DC6F",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: "6–8" },
      { name: "Lateral Raises", sets: 3, reps: "12–15" },
      { name: "Rear Delt Fly", sets: 3, reps: "12–15" },
      { name: "Plank", sets: 3, reps: "30–60 sec" },
      { name: "Hanging Leg Raises", sets: 3, reps: "10–15" },
    ],
  },
  {
    id: 6,
    label: "Day 6",
    name: "Light Cardio",
    emoji: "⚡",
    color: "#5DADE2",
    exercises: [
      { name: "Walking / Sports / Light Activity", sets: 1, reps: "Optional" },
    ],
  },
];

const meals = [
  {
    name: "Breakfast",
    emoji: "🍳",
    items: ["3 eggs", "1 cup oats", "1 fruit (banana or apple)"],
  },
  {
    name: "Lunch",
    emoji: "🍗",
    items: ["150–200g chicken", "1–1.5 cups rice", "Vegetables"],
  },
  {
    name: "Snack",
    emoji: "🥜",
    items: ["Protein shake", "Handful of nuts"],
  },
  {
    name: "Dinner",
    emoji: "🥩",
    items: ["150–200g beef/chicken", "Potatoes or rice", "Vegetables"],
  },
  {
    name: "Evening Snack",
    emoji: "🌙",
    items: ["Greek yogurt", "OR 2 boiled eggs"],
  },
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekKey() {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function FitnessApp() {
  const [tab, setTab] = useState("workout");
  const [activeDay, setActiveDay] = useState(null);
  const [completedSets, setCompletedSets] = useState({});
  const [completedMeals, setCompletedMeals] = useState({});
  const [weeklyLog, setWeeklyLog] = useState({});
  const todayKey = getTodayKey();
  const weekKey = getWeekKey();

  const todayDayIndex = new Date().getDay();
  const adjustedDay = todayDayIndex === 0 ? 6 : todayDayIndex - 1;

  const toggleSet = (exerciseName, setIdx) => {
    const key = `${exerciseName}-${setIdx}`;
    setCompletedSets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMeal = (mealName) => {
    setCompletedMeals((prev) => ({ ...prev, [mealName]: !prev[mealName] }));
  };

  const logWorkout = (dayId) => {
    setWeeklyLog((prev) => ({
      ...prev,
      [todayKey]: dayId,
    }));
  };

  const daysLogged = Object.keys(weeklyLog).filter((d) => d.startsWith(weekKey.split("-W")[0])).length;
  const totalSets = activeDay
    ? activeDay.exercises.reduce((sum, ex) => sum + ex.sets, 0)
    : 0;
  const doneSets = activeDay
    ? activeDay.exercises.reduce(
        (sum, ex) =>
          sum +
          Array.from({ length: ex.sets }, (_, i) =>
            completedSets[`${ex.name}-${i}`] ? 1 : 0
          ).reduce((a, b) => a + b, 0),
        0
      )
    : 0;
  const progress = totalSets > 0 ? Math.round((doneSets / totalSets) * 100) : 0;
  const mealsLogged = Object.values(completedMeals).filter(Boolean).length;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e8e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "0 0 80px 0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        padding: "28px 24px 20px",
        borderBottom: "1px solid #1e1e3a",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: 28 }}>🏋🏾‍♂️</span>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
              GRIND TRACKER
            </div>
            <div style={{ fontSize: 12, color: "#6b7fa3", letterSpacing: "2px", textTransform: "uppercase" }}>
              Weekly Gym + Meal Plan
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {[
            { label: "This Week", value: `${Object.keys(weeklyLog).length}d`, emoji: "📅" },
            { label: "Meals Today", value: `${mealsLogged}/5`, emoji: "🍽️" },
            { label: "~2200", value: "kcal", emoji: "🔥" },
          ].map((s) => (
            <div key={s.label} style={{
              flex: 1,
              background: "#12122a",
              borderRadius: 12,
              padding: "10px 12px",
              border: "1px solid #1e1e3a",
            }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.emoji} {s.value}</div>
              <div style={{ fontSize: 11, color: "#6b7fa3", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        background: "#0d0d1a",
        borderBottom: "1px solid #1e1e3a",
        padding: "0 24px",
      }}>
        {[
          { id: "workout", label: "Workout", emoji: "💪" },
          { id: "meals", label: "Meals", emoji: "🍽️" },
          { id: "tracker", label: "Tracker", emoji: "📊" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: "14px 8px",
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #FF6B35" : "2px solid transparent",
              color: tab === t.id ? "#FF6B35" : "#6b7fa3",
              fontWeight: tab === t.id ? 700 : 500,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px 20px 0" }}>
        {/* WORKOUT TAB */}
        {tab === "workout" && !activeDay && (
          <div>
            <div style={{ fontSize: 13, color: "#6b7fa3", marginBottom: 16, letterSpacing: "1px", textTransform: "uppercase" }}>
              Select Today's Session
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {workoutDays.map((day, idx) => {
                const isToday = idx === adjustedDay;
                const isLogged = Object.values(weeklyLog).includes(day.id);
                return (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day)}
                    style={{
                      background: isToday
                        ? `linear-gradient(135deg, ${day.color}22, ${day.color}11)`
                        : "#12122a",
                      border: isToday
                        ? `1.5px solid ${day.color}88`
                        : "1.5px solid #1e1e3a",
                      borderRadius: 16,
                      padding: "16px 18px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      textAlign: "left",
                      transition: "transform 0.15s, box-shadow 0.15s",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.01)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    {isToday && (
                      <div style={{
                        position: "absolute", top: 8, right: 12,
                        fontSize: 10, fontWeight: 700,
                        color: day.color, letterSpacing: "1px",
                        textTransform: "uppercase", opacity: 0.9,
                      }}>TODAY</div>
                    )}
                    <div style={{
                      width: 44, height: 44,
                      borderRadius: 12,
                      background: `${day.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                    }}>
                      {isLogged ? "✅" : day.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, color: "#6b7fa3", marginBottom: 2 }}>{day.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{day.name}</div>
                      <div style={{ fontSize: 12, color: "#6b7fa3", marginTop: 2 }}>
                        {day.exercises.length} exercise{day.exercises.length > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div style={{ color: day.color, fontSize: 18 }}>›</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ACTIVE WORKOUT */}
        {tab === "workout" && activeDay && (
          <div>
            <button
              onClick={() => setActiveDay(null)}
              style={{
                background: "none", border: "none",
                color: "#6b7fa3", cursor: "pointer",
                fontSize: 14, display: "flex", alignItems: "center", gap: 6,
                marginBottom: 16, padding: 0,
              }}
            >
              ← Back
            </button>

            {/* Progress bar */}
            <div style={{
              background: "#12122a", borderRadius: 16, padding: "16px 18px",
              border: `1.5px solid ${activeDay.color}44`, marginBottom: 18,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>
                  {activeDay.emoji} {activeDay.name}
                </span>
                <span style={{ color: activeDay.color, fontWeight: 700 }}>{progress}%</span>
              </div>
              <div style={{ height: 6, background: "#1e1e3a", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${activeDay.color}, ${activeDay.color}bb)`,
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ fontSize: 12, color: "#6b7fa3", marginTop: 6 }}>
                {doneSets} / {totalSets} sets completed
              </div>
            </div>

            {activeDay.exercises.map((ex) => (
              <div key={ex.name} style={{
                background: "#12122a",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 12,
                border: "1px solid #1e1e3a",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: "#6b7fa3" }}>
                      {ex.sets} sets × {ex.reps} reps
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {Array.from({ length: ex.sets }, (_, i) => {
                    const done = completedSets[`${ex.name}-${i}`];
                    return (
                      <button
                        key={i}
                        onClick={() => toggleSet(ex.name, i)}
                        style={{
                          width: 40, height: 40,
                          borderRadius: 10,
                          border: done ? `2px solid ${activeDay.color}` : "2px solid #2a2a4a",
                          background: done ? `${activeDay.color}22` : "#0a0a1a",
                          color: done ? activeDay.color : "#4a4a6a",
                          fontWeight: 800, fontSize: 13,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {progress === 100 && (
              <button
                onClick={() => {
                  logWorkout(activeDay.id);
                  setActiveDay(null);
                  setCompletedSets({});
                }}
                style={{
                  width: "100%",
                  padding: "16px",
                  background: `linear-gradient(135deg, ${activeDay.color}, ${activeDay.color}cc)`,
                  border: "none",
                  borderRadius: 16,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  marginTop: 8,
                  boxShadow: `0 8px 24px ${activeDay.color}44`,
                }}
              >
                🎉 Log Workout Complete!
              </button>
            )}
          </div>
        )}

        {/* MEALS TAB */}
        {tab === "meals" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #FF6B3522, #FF6B3511)",
              border: "1px solid #FF6B3544",
              borderRadius: 16, padding: "14px 16px", marginBottom: 18,
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <span style={{ fontSize: 28 }}>🔥</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>~2200 kcal / day</div>
                <div style={{ fontSize: 12, color: "#6b7fa3" }}>Cutting meal plan · High protein</div>
              </div>
            </div>

            {meals.map((meal) => {
              const done = completedMeals[meal.name];
              return (
                <div
                  key={meal.name}
                  style={{
                    background: done ? "#0d1f1a" : "#12122a",
                    border: done ? "1.5px solid #27ae6088" : "1.5px solid #1e1e3a",
                    borderRadius: 16,
                    padding: "16px 18px",
                    marginBottom: 12,
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{meal.emoji}</span>
                      <span style={{ fontWeight: 700, fontSize: 16, color: done ? "#2ecc71" : "#fff" }}>
                        {meal.name}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleMeal(meal.name)}
                      style={{
                        width: 32, height: 32,
                        borderRadius: 50,
                        border: done ? "2px solid #2ecc71" : "2px solid #2a2a4a",
                        background: done ? "#2ecc7122" : "none",
                        color: done ? "#2ecc71" : "#4a4a6a",
                        cursor: "pointer",
                        fontSize: 14, fontWeight: 800,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}
                    >
                      {done ? "✓" : "○"}
                    </button>
                  </div>
                  <div style={{ paddingLeft: 4 }}>
                    {meal.items.map((item) => (
                      <div key={item} style={{
                        fontSize: 13, color: done ? "#6b9a7a" : "#8899bb",
                        padding: "3px 0",
                        display: "flex", alignItems: "center", gap: 8,
                      }}>
                        <span style={{ color: "#2a2a4a", fontSize: 10 }}>●</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TRACKER TAB */}
        {tab === "tracker" && (
          <div>
            <div style={{ fontSize: 13, color: "#6b7fa3", marginBottom: 16, letterSpacing: "1px", textTransform: "uppercase" }}>
              This Week's Log
            </div>

            {/* Weekly grid */}
            <div style={{
              background: "#12122a", borderRadius: 16, padding: "18px",
              border: "1px solid #1e1e3a", marginBottom: 18,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                {DAYS_OF_WEEK.map((d, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - adjustedDay + i);
                  const key = date.toISOString().split("T")[0];
                  const loggedDayId = weeklyLog[key];
                  const loggedDay = loggedDayId ? workoutDays.find(wd => wd.id === loggedDayId) : null;
                  const isToday = i === adjustedDay;

                  return (
                    <div key={d} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: isToday ? "#FF6B35" : "#6b7fa3", marginBottom: 6, fontWeight: isToday ? 700 : 400 }}>
                        {d}
                      </div>
                      <div style={{
                        width: 36, height: 36,
                        borderRadius: 10,
                        background: loggedDay ? `${loggedDay.color}22` : isToday ? "#1e1e3a" : "#0a0a1a",
                        border: loggedDay ? `2px solid ${loggedDay.color}66` : isToday ? "2px solid #FF6B3544" : "2px solid #1a1a2e",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16,
                        margin: "0 auto",
                      }}>
                        {loggedDay ? "✅" : isToday ? "📍" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{
                height: 1, background: "#1e1e3a", margin: "12px 0"
              }} />

              <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#FF6B35" }}>
                    {Object.keys(weeklyLog).length}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7fa3" }}>Days Trained</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#4ECDC4" }}>
                    {mealsLogged}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7fa3" }}>Meals Today</div>
                </div>
                <div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#A8E063" }}>
                    {Math.round((Object.keys(weeklyLog).length / 5) * 100)}%
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7fa3" }}>Weekly Goal</div>
                </div>
              </div>
            </div>

            {/* Workout legend */}
            <div style={{ fontSize: 13, color: "#6b7fa3", marginBottom: 12, letterSpacing: "1px", textTransform: "uppercase" }}>
              Plan Overview
            </div>
            {workoutDays.map((day) => (
              <div key={day.id} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 16px",
                background: "#12122a",
                border: "1px solid #1e1e3a",
                borderRadius: 12,
                marginBottom: 8,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: day.color, flexShrink: 0
                }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, color: "#8899bb" }}>{day.label} · </span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{day.name}</span>
                </div>
                <span style={{ fontSize: 13, color: "#6b7fa3" }}>
                  {day.exercises.length} exercises
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
