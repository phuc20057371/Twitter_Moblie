import mongoose, { Document, Schema, Types } from 'mongoose';
import { NotificationType } from './notification.enum';

interface INotification extends Document {
  userName: string;
  notifications: Types.DocumentArray<{
    _id?: Types.ObjectId; // Make _id property optional
    type: NotificationType;
    message: string;
    fromUserName: string;
    isRead: boolean;
  }>;
}

const notificationSchema: Schema = new Schema({
  userName: { type: String, required: true },
  notifications: [
    {
      type: { type: String, enum: Object.values(NotificationType), required: true },
      message: { type: String, required: true },
      fromUserName: { type: String, required: true },
      isRead: { type: Boolean, default: false },
    },
  ],
});

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
