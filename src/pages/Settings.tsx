import { useTheme } from "@/context/theme-provider";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { useState } from "react";

const Settings = () => {
  const { theme, setTheme } = useTheme(); 
  const [user] = useState({
    name: "Rohan Kumar Mahto",
    email: "rohan@example.com",
  });

  return (
    <div className="md:p-6 p-4 space-y-8 w-full">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="rounded-md border bg-background p-4 space-y-4">
        <h2 className="text-lg font-semibold">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input value={user.name} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input value={user.email} disabled />
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900 p-4 space-y-4">
        <h2 className="text-lg font-semibold">Appearance</h2>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-900 p-4 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};

export default Settings;
