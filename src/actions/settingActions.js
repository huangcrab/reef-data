import { ALLOW_REGISTRATION } from "./types";

export const allowRegistration = () => {
  const setting = JSON.parse(localStorage.getItem("setting"));
  setting.allowRegistration = !setting.allowRegistration;

  localStorage.setItem("setting", JSON.stringify(setting));
  return {
    type: ALLOW_REGISTRATION,
    payload: setting.allowRegistration
  };
};
