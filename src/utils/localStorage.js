export const clearStats = () => {
  localStorage.removeItem("sessions");
  localStorage.removeItem("focusTime");
  localStorage.removeItem("breakTime");
  localStorage.removeItem("distractionCount");
};
