import { Inngest } from "inngest";
import { serve } from "inngest/vercel";
import connectDB from "../configs/db.js";
import User from "../models/user.js";

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

// other functions...

export default serve({
  client: inngest,
  functions: [syncUserCreation /* ... */],
});
