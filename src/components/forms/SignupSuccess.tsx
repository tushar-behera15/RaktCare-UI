"use client";

import { motion } from "framer-motion";
import { CheckCircleIcon, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SignupSuccessProps {
  userType: "donor" | "hospital";
  name: string;
}

export function SignupSuccess({ userType, name }: SignupSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center gap-6">
      {/* Animated success icon */}
      <div className="relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
          >
            <CheckCircleIcon className="h-10 w-10 text-primary" />
          </motion.div>
        </motion.div>

        {/* Orbiting hearts */}
        {[0, 120, 240].map((deg, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              marginTop: -6,
              marginLeft: -6,
            }}
            initial={{ rotate: deg, translateX: 0, opacity: 0 }}
            animate={{
              rotate: [deg, deg + 360],
              translateX: 44,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.15,
              ease: "easeOut",
            }}
          >
            <HeartIcon className="h-3 w-3 fill-primary text-primary" />
          </motion.div>
        ))}
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-xl font-semibold text-foreground">
          Registration Successful! 🎉
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Welcome to <span className="text-primary font-semibold">Rakt Care</span>,{" "}
          <span className="font-medium text-foreground">{name}</span>!
          {userType === "donor"
            ? " Your donor profile is set up. You're now part of a community saving lives every day."
            : " Your hospital is registered. You can now manage blood requests and donations."}
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
      >
        <Button className="flex-1 h-9 text-sm" size="lg">
          <Link href="/auth/login">Sign In to Dashboard</Link>
        </Button>
        <Button variant="outline" className="flex-1 h-9 text-sm" size="lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
