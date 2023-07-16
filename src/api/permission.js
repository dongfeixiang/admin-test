import http from "@/utils/http";

const getPermissions = async () => {
  try {
    const response = await http.get("/api/permission/");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getPermissions};
