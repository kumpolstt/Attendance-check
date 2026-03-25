"use client";

import { motion } from "motion/react";
import { UserCheck, Check, X, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialRoster = [
  { id: 1, name: "Alexander Wright", present: true },
  { id: 2, name: "Kumpol Saengtabtim", present: true },
  { id: 3, name: "Caleb Vance", present: true },
  { id: 4, name: "Daphne Bloom", present: true },
  { id: 5, name: "Elias Frost", present: true },
  { id: 6, name: "Fiona Grey", present: true },
  { id: 7, name: "Gideon Hayes", present: true },
  { id: 8, name: "Hazel Quinn", present: true },
];

export default function RollCallPage() {
  const [roster, setRoster] = useState(initialRoster);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const toggleAttendance = (id) => {
    setRoster(roster.map(student => 
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const submitAttendance = () => {
    setIsSubmitting(true);
    
    const presentCount = roster.filter(s => s.present).length;
    const absentCount = roster.length - presentCount;
    
    const newRecord = {
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      present: presentCount,
      absent: absentCount,
      timestamp: Date.now(),
    };

    const existingRecords = JSON.parse(localStorage.getItem("attendance_records") || "[]");
    localStorage.setItem("attendance_records", JSON.stringify([newRecord, ...existingRecords]));

    setTimeout(() => {
      router.push("/history");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f6fafd] text-[#171c1f] selection:bg-[#c4e7ff] selection:text-[#001e2c]">
      <Navbar />

      <main className="pt-24 pb-32 px-6 max-w-4xl mx-auto">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.1em] text-[#70787e] font-bold">Daily Session</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Roll Call</h2>
          </div>
        </motion.section>

        <div className="grid gap-4">
          {roster.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                student.present 
                  ? "bg-white border-[#bfc8cf]/15 shadow-sm" 
                  : "bg-[#fef1f1] border-[#f9dada] shadow-none"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  student.present ? "bg-[#f0f4f7] text-[#00668B]" : "bg-[#f9dada] text-[#ba1a1a]"
                }`}>
                  {student.name.charAt(0)}
                </div>
                <span className={`font-bold text-lg ${!student.present && "text-[#ba1a1a]"}`}>
                  {student.name}
                </span>
              </div>

              <button 
                onClick={() => toggleAttendance(student.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${
                  student.present 
                    ? "bg-[#e1f4ff] text-[#00668B] hover:bg-[#c4e7ff]" 
                    : "bg-[#ba1a1a] text-white hover:bg-[#93000a]"
                }`}
              >
                {student.present ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Present</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4" />
                    <span>Absent</span>
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <button 
            onClick={submitAttendance}
            disabled={isSubmitting}
            className={`flex items-center gap-3 bg-gradient-to-br from-[#004d6a] to-[#00668b] text-white px-10 py-5 rounded-2xl font-bold tracking-tight shadow-xl shadow-sky-900/20 active:scale-95 transition-all duration-300 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
            }`}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Attendance</span>
              </>
            )}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
