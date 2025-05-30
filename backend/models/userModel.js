import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email:    { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  avatar:   { type: String, default: 'https://thumbs.dreamstime.com/b/user-account-icon-default-avatar-profile-vector-illustration-306029332.jpg' },
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }]
}, { timestamps: true });



const User = mongoose.model('User', userSchema);
export default User;
