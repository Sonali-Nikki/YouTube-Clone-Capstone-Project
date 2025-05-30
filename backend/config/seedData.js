import User from "../models/userModel.js";
import Channel from "../models/channelModel.js";
import Video from "../models/videoModel.js";
import Comment from "../models/commentModel.js";
import { adminData, usersData, channelsData } from "../data/data.js";


async function seedData(){
  try {

    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({});


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

    const adminSignedin = await adminSignin.json();
    if (!adminSignin.ok) throw new Error(adminSignedin.message || 'Signin failed');


    const adminToken = adminSignedin.token;

    const userToken = [];

    for (const userData of usersData) {

      const userRegister = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.registerData)
      });
  
      const userRegistered = await userRegister.json();
      if (!userRegister.ok) throw new Error(userRegistered.message || 'Registration failed');
  
      const userSignin = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData.loginData)
      });
      const userSignedin = await userSignin.json();
      if (!userSignin.ok) throw new Error(userSignedin.message || 'Signin failed');

      userToken.push(userSignedin.token);
    };

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

    console.log('Seeding completed');

  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

export default seedData;