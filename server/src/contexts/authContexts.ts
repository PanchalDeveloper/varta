export const loginContext = (req: any, res: any) => {
  console.log("loginContext req :>> ", req);
  return res.json({
    id: "1",
    name: "Aman Panchal",
    email: "ap@email.com",
    password: "Aman@123!",
  });
};

export const registerContext = (req: any, res: any) => {
  console.log("registerContext req :>> ", req);
  return res.json({
    id: "1",
    name: "Aman Panchal",
    email: "ap@email.com",
    password: "Aman@123!",
  });
};
