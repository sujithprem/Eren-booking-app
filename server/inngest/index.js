import { Inngest } from "inngest";
import { serve } from "inngest/vercel";
import User from "../models/User.js";
import connectDB from "../configs/db.js";

const inngest = new Inngest({
  id: "movie-ticket-booking",
  eventKey: process.env.INNGEST_EVENT_KEY,
});

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (!email) return;

    await User.create({
      _id: id,
      email,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    await User.findByIdAndDelete(event.data.id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (!email) return;

    await User.findByIdAndUpdate(
      id,
      {
        email,
        name: `${first_name} ${last_name}`,
        image: image_url,
      },
      { upsert: true }
    );
  }
);

export default serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
  ],
});