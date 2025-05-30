// importing necessary models and seed data
import User from "../models/userModel.js";
import Channel from "../models/channelModel.js";
import Video from "../models/videoModel.js";
import Comment from "../models/commentModel.js";
import { adminData, usersData, channelsData } from "../data/data.js";

// function to seed the data
async function seedData(){
  try {
// clearing the database
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});

// registering the admin user who owns the seed channels
    const adminRegister = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData.registerData)
    });

    const adminRegistered = await adminRegister.json();
    if (!adminRegister.ok) throw new Error(adminRegistered.message || 'Registration failed');

    const adminSignin = await fetch('http://localhost:5000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData.loginData)
    });

// signing in the admin user to get the token
    const adminSignedin = await adminSignin.json();
    if (!adminSignin.ok) throw new Error(adminSignedin.message || 'Signin failed');

// storing the token for admin
    const adminToken = adminSignedin.token;

    const userToken = [];

// running a for loop to register and signin all the users who will commnet on the videos
    for (const userData of usersData) {

// registering the user
      const userRegister = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.registerData)
      });
  
      const userRegistered = await userRegister.json();
      if (!userRegister.ok) throw new Error(userRegistered.message || 'Registration failed');
  
// signing in the user to get the token
      const userSignin = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.loginData)
      });
      const userSignedin = await userSignin.json();
      if (!userSignin.ok) throw new Error(userSignedin.message || 'Signin failed');

// storing the respective user token
      userToken.push(userSignedin.token);
    };

// running a for loop to create all the channels for the admin user, add videos to the channel and comments to the videos
    for (const channelData of channelsData){

// creating channel
      const createChannel = await fetch(`http://localhost:5000/api/channel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${adminToken}`,
        },
        body: JSON.stringify(channelData.channelData)
      });

      const createdChannel = await createChannel.json();
      if (!createChannel.ok) throw new Error(createdChannel.message || 'Channel creation failed');
      console.log(`📺 Created channel: ${createdChannel.channelName}`);

// running a for loop to add videos to the channel and comments to the videos
      for (const videoData of channelData.channelVideo) {

// uploading the video
        const uploadVideo = await fetch(`http://localhost:5000/api/video`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${adminToken}`,
          },
          body: JSON.stringify({...videoData.videoData, channel: createdChannel._id})
        });
  
        const uploadedVideo = await uploadVideo.json();
        if (!uploadVideo.ok) throw new Error(uploadedVideo.message || 'Video uploading failed');
        console.log(`🎞 Uploaded video: ${uploadedVideo.title} for ${createdChannel.channelName}`);

// running a for loop to add comments to the video
        for (const [index, commentData] of videoData.videoComment.entries()) {

// adding comments
          const addComment = await fetch(`http://localhost:5000/api/comment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${userToken[index]}`,
            },
            body: JSON.stringify({...commentData.commentData, video: uploadedVideo._id})
          });
    
          const addedComment = await addComment.json();
          if (!addComment.ok) throw new Error(addedComment.message || 'Comment addition failed');
          console.log(`added comment ${index+1} to ${uploadedVideo.title}`);
        }
      }
    }

    console.log('✅ Seeding completed');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

export default seedData;