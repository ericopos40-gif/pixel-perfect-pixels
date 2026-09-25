import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Users,
  Calendar,
  Stethoscope,
  Flask,
  Pill,
  DollarSign,
  Settings,
  Heart,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum([
    "admin",
    "reception",
    "nurse",
    "dentist",
    "laboratory",
    "pharmacy",
    "accounting",
    "website-admin",
  ]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const roles = [
  {
    value: "admin",
    label: "Administrator",
    icon: Settings,
    description: "Full system access and management",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    value: "reception",
    label: "Reception",
    icon: Calendar,
    description: "Appointment scheduling and check-in",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    value: "dentist",
    label: "Dentist",
    icon: Stethoscope,
    description: "Patient treatment and diagnosis",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    value: "nurse",
    label: "Nurse",
    icon: Heart,
    description: "Patient vitals and care",
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
  {
    value: "laboratory",
    label: "Laboratory",
    icon: Flask,
    description: "Lab tests and results",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    value: "pharmacy",
    label: "Pharmacy",
    icon: Pill,
    description: "Prescription management",
    color: "text-teal-600",
    bg: "bg-teal-100",
  },
  {
    value: "accounting",
    label: "Accounting",
    icon: DollarSign,
    description: "Billing and financial records",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    value: "website-admin",
    label: "Website Admin",
    icon: Settings,
    description: "Website content management",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
];

// Demo credentials
const demoCredentials = {
  username: "demo",
  password: "demo",
};

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "admin",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple demo authentication
      if (
        values.username === demoCredentials.username &&
        values.password === demoCredentials.password
      ) {
        toast.success("Login successful!", {
          description: `Welcome back, ${values.username}!`,
        });

        // Store role in sessionStorage (simple demo auth)
        if (typeof window !== "undefined") {
          sessionStorage.setItem("userRole", values.role);
          sessionStorage.setItem("username", values.username);
        }

        // Navigate to workspace
        navigate({
          to: "/workspace/$role",
          params: { role: values.role },
        });
      } else {
        toast.error("Invalid credentials", {
          description: "Please check your username and password.",
        });
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedRole = roles.find((r) => r.value === form.watch("role"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-3">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Heart className="h-7 w-7 text-white fill-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">BrightSmile</h1>
            </div>
            <p className="text-xl text-gray-600">Dental Care Centre</p>
            <p className="text-sm text-gray-500">Comprehensive Clinic Management System</p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">12,000+ Patients</div>
                <div className="text-sm text-gray-600">Trusted by community</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">5 Expert Dentists</div>
                <div className="text-sm text-gray-600">Specialized care team</div>
              </div>
            </div>

            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">24/7 Service</div>
                <div className="text-sm text-gray-600">Always here for you</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="p-8 shadow-xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-sm text-gray-600">
                Sign in to access your workspace
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue>
                              {selectedRole && (
                                <div className="flex items-center gap-2">
                                  <selectedRole.icon className={`h-4 w-4 ${selectedRole.color}`} />
                                  <span>{selectedRole.label}</span>
                                </div>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              <div className="flex items-center gap-2">
                                <div className={`p-1 rounded ${role.bg}`}>
                                  <role.icon className={`h-4 w-4 ${role.color}`} />
                                </div>
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {role.description}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Demo Credentials Info */}
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-sm space-y-1">
                <p className="font-semibold text-blue-900">Demo Credentials:</p>
                <p className="text-blue-700">
                  Username: <code className="bg-white px-2 py-0.5 rounded">demo</code>
                </p>
                <p className="text-blue-700">
                  Password: <code className="bg-white px-2 py-0.5 rounded">demo</code>
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Select any role to explore different workspaces
                </p>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
