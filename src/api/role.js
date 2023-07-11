import http from "@/utils/http";

const getRoles = async () => {
  try {
    const response = await http.get("/api/group/");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const addRole = async (role) => {
  try {
    const response = await http.post("/api/group/", { ...role });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateRole = async (id, role) => {
  try {
    const response = await http.put(`/api/group/${id}/`, { ...role });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteRole = async (id) => {
  try {
    const response = await http.delete(`/api/group/${id}/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getRoles, addRole, updateRole, deleteRole };
