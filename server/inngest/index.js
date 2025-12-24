import { Inngest } from "inngest";
import { serve } from "inngest/vercel";
import User from "../models/User.js";
import dbConnect from "../configs/db.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await dbConnect();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (!email) return { skipped: true };

    await User.create({
      _id: id,
      email,
      name: `${first_name} ${last_name}`,
      image: image_url,
    });

    return { success: true };
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await dbConnect();
    await User.findByIdAndDelete(event.data.id);
    return { deleted: true };
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await dbConnect();

    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const email = email_addresses?.[0]?.email_address;
    if (!email) return { skipped: true };

    await User.findByIdAndUpdate(
      id,
      {
        email,
        name: `${first_name} ${last_name}`,
        image: image_url,
      },
      { upsert: true }
    );

    return { updated: true };
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
