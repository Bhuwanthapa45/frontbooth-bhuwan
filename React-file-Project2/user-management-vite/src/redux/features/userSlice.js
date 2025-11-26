import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 'default-1',
      fullName: 'Alice Johnson',
      username: 'alicej',
      age: 24,
      email: 'alice@example.com',
      country: 'Finland',
      gender: 'Female',
      skills: ['React', 'JavaScript'],
      dob: '1999-05-15',
      about: 'Frontend developer.',
    }
  ],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
