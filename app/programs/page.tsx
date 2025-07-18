"use client";

import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AppLayout } from "~/components/AppLayout";
import { ProgressDashboard } from "~/components/ProgressDashboard";
import { getPrograms } from "~/network/programs";
import type { Program } from "~/types/program";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await getPrograms();
        if (response.status === "success") {
          setPrograms(response.data);
        } else {
          setError("Failed to load programs");
        }
      } catch (err) {
        setError("Failed to load programs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          className="rounded-full h-16 w-16 border-4 border-accent border-b-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-xl shadow-md"
        >
          <div className="text-red-600 text-xl mb-2 font-semibold">Error</div>
          <p className="text-gray-700">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <ProgressDashboard />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link href={`/programs/${program.id}`} className="group block">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden relative">
                <div className="p-6 relative">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-ring to-primary p-3 rounded-lg shadow-md"
                    >
                      <BookOpen className="h-6 w-6 text-white" />
                    </motion.div>
                    <motion.div
                      className="h-5 w-5 text-gray-400"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-3">{program.title}</h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-semibold text-gray-700">
                        {program.duration_estimate_hours}h
                      </span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                      <BookOpen className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-semibold text-gray-700">
                        {program.activities.length} activities
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 relative">
                  <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-ring to-primary h-3 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "0%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Ready to begin your journey
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {programs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-full p-6 inline-flex mb-4"
          >
            <BookOpen className="h-12 w-12 text-gray-400" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-600 mb-3">No programs available yet</h3>
          <p className="text-gray-500">
            New learning opportunities are being crafted. Check back soon!
          </p>
        </motion.div>
      )}
    </AppLayout>
  );
}
