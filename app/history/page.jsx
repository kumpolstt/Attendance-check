"use client";

import { motion } from "motion/react";
import { Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";

export default function HistoryPage() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const savedRecords = localStorage.getItem("attendance_records");
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

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
            <span className="text-[11px] uppercase tracking-[0.1em] text-[#70787e] font-bold">Class Archive</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">Attendance History</h2>
          </div>
        </motion.section>

        {records.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-20 px-8 rounded-[2rem] bg-[#f0f4f7] border border-[#bfc8cf]/15 text-center relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none" 
              style={{ 
                backgroundImage: `radial-gradient(circle at 20% 30%, #00668B 0%, transparent 50%), radial-gradient(circle at 80% 70%, #90efef 0%, transparent 50%)` 
              }}
            />
            
            <div className="w-24 h-24 mb-6 rounded-full bg-white flex items-center justify-center shadow-lg shadow-sky-900/5 relative z-10">
              <Clock className="w-12 h-12 text-[#70787e]" />
            </div>

            <h3 className="text-2xl font-bold mb-2 relative z-10">Archive is currently empty</h3>
            <p className="text-[#40484e] max-w-xs leading-relaxed mb-10 relative z-10">
              No attendance history recorded yet. Completed sessions will be neatly filed here for your records.
            </p>

            <a href="/" className="bg-gradient-to-br from-[#004d6a] to-[#00668b] text-white px-8 py-4 rounded-xl font-bold tracking-tight shadow-lg shadow-sky-900/20 active:scale-95 transition-all duration-200 relative z-10">
              Start Today's Roll Call
            </a>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {records.map((record, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-[#bfc8cf]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div>
                  <h4 className="font-bold text-lg">{record.date}</h4>
                  <p className="text-[#70787e] text-sm">{record.time}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center bg-[#f0f4f7] px-4 py-2 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#70787e]">Present</span>
                    <span className="text-xl font-black text-[#00668B]">{record.present}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#f0f4f7] px-4 py-2 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-[#70787e]">Absent</span>
                    <span className="text-xl font-black text-[#ba1a1a]">{record.absent}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
