import mongoose from 'mongoose';



const channelSchema = new mongoose.Schema({
  channelName: { type: String, trim: true, required: true },
  description: { type: String, trim: true, default: 'A channel for educational/entertainment purpose' },
  channelBanner: { type: String, trim: true, default: 'https://dynamic.brandcrowd.com/template/preview/design/72a2045d-5feb-4f92-b1ec-70cef5ad56b0?v=4&designTemplateVersion=2&size=design-preview-wide-1x' },
  channelLogo: { type: String, trim: true, default: 'https://assets.zenn.com/strapi_assets/medium_youtube_channel_logo_39446f1338.png' },
  subscribers: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }]
}, { timestamps: true });



const Channel = mongoose.model('Channel', channelSchema);
export default Channel;
