const intialState = {
  token: null,
  users: [
    {
      id: 1,
      username: "abdur544",
      password: "12345678"
    }
  ],
  catogaryData: [
    {
      id: 1,
      name: "SUV",
      wheelType: "All Wheel"
    },
    {
      id: 2,
      name: "Sedan",
      wheelType: "Front wheel"
    },
    {
      id: 3,
      name: "Truck",
      wheelType: "All Wheel"
    },
  ],
  cars: [
    {
      id: 1,
      color: "black",
      model: "Sportage",
      make: "kia",
      regNo: "12323",
      categories: 1,
    },
    {
      id: 2,
      color: "black",
      model: "tuscon",
      make: "hundai",
      regNo: "2132",
      categories: 3,
    },
    {
      id: 3,
      color: "black",
      model: "H6",
      make: "haval",
      regNo: "232312",
      categories: 2,
    },
  ],
};
export const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "Remove_Categories":
      return { ...state, catogaryData: state.catogaryData.filter(item => item.id !== action.payload) };
    case "Remove_Car":
      return { ...state, cars: state.cars.filter(item => item.id !== action.payload) };
    case "ADD_Categories":
      return { ...state, catogaryData: [...state.catogaryData, action.payload] };
    case "ADD_Car":
      return { ...state, cars: [...state.cars, action.payload] };
    case "ADD_users":
      return { ...state, users: [...state.users, action.payload] };
    case "Update_Categories":
      return {
        ...state, catogaryData: state.catogaryData.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
      };
    case "Update_Cars":
      return {
        ...state, cars: state.cars.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          }
          return item
        })
      };
    default:
      return state;
  }
};
