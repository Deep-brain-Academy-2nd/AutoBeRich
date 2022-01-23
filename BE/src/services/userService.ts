import { IUserInputDTO, userUniqueSearchInput } from '../interfaces/IUser';
import User from '../models/User';

const createUser = (data: IUserInputDTO) => {
  const user = new User(data);
  return user.save();
};

// email로 user가 존재하는지 확인
const findEmail = (data: userUniqueSearchInput) => {
  const { email } = data;

  const result = User.findOne({ email });
  return result;
};

const updateTradingStrategy = async (data: userUniqueSearchInput) => {
  try {
    const { email, strategy } = data;
    const result = await User.findOneAndUpdate({ email }, { $set: { strategy } });
  } catch (error) {
    console.error(error);
  }
};

const updateStatusAutoTrading = async (data: userUniqueSearchInput) => {
  try {
    const { email, status } = data;
    const result = await User.findOneAndUpdate({ email }, { $set: { status } });
  } catch (error) {
    console.error(error);
  }
};

export default {
  createUser,
  findEmail,
  updateTradingStrategy,
  updateStatusAutoTrading,
};
