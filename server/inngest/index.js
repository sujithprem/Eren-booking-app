import { serve } from "inngest/vercel";
import User from "../models/User.js";
import dbConnect from "../configs/db.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await dbConnect(); // 🔥 REQUIRED

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.create({
    _id: id, // ✅ FIX
    email: email_addresses[0].email_address,
    name: `${first_name} ${last_name}`,
    image: image_url,
    });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await dbConnect(); // 🔥 REQUIRED
    await User.findByIdAndDelete(event.data.id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await dbConnect(); // 🔥 REQUIRED

    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    await User.findByIdAndUpdate(
    id,
    {
    email: email_addresses[0].email_address,
    name: `${first_name} ${last_name}`,
    image: image_url,
    },
    { upsert: true, new: true }
    );
  }
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
];
