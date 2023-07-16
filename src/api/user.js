import http from "@/utils/http";

const getUsers = async () => {
  try {
    const response = await http.get("/api/user/");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async () => {
  try {
    const response = await http.get('/api/user/self');
    return response
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (user) => {
  try {
    const response = await http.post("/api/user/", user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, user) => {
  try {
    const response = await http.put(`/api/user/${id}/`, user);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await http.delete(`/api/user/${id}/`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUsers, getUserInfo, addUser, updateUser, deleteUser };
