import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- ANIMATION COMPONENT FOR SLIDE 3: Cumulative Frequency ---
const CumulativeFrequencyAnimator = () => {
  const initialData = [
    { type: 'Other', freq: 187, cumFreq: 187 },
    { type: 'Possessive', freq: 81, cumFreq: 268 },
    { type: 'Question', freq: 86, cumFreq: 354 },
    { type: 'Pred adjective', freq: 155, cumFreq: 509 },
    { type: 'Pred nominative', freq: 197, cumFreq: 706 },
    { type: 'Transitive', freq: 587, cumFreq: 1293 },
  ].reverse(); // Reverse for top-down display

  const [step, setStep] = useState(-1);
  const [displayedFreqs, setDisplayedFreqs] = useState(initialData.map((d, i) => i === initialData.length - 1 ? d.cumFreq : 0));

  const handleAnimate = () => {
    setStep(0);
    setDisplayedFreqs(initialData.map((d, i) => i === initialData.length - 1 ? d.cumFreq : 0));
  };

  const handleReset = () => {
    setStep(-1);
    setDisplayedFreqs(initialData.map((d, i) => i === initialData.length - 1 ? d.cumFreq : 0));
  };
  
  useEffect(() => {
    if (step >= 0 && step < initialData.length - 1) {
      const timer = setTimeout(() => {
        const nextStep = step + 1;
        const newDisplayedFreqs = [...displayedFreqs];
        const prevCumFreq = displayedFreqs[initialData.length - 1 - (step)];
        const currentFreq = initialData[initialData.length - 1 - nextStep].freq;
        newDisplayedFreqs[initialData.length - 1 - nextStep] = prevCumFreq + currentFreq;
        
        setDisplayedFreqs(newDisplayedFreqs);
        setStep(nextStep);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, displayedFreqs, initialData]);

  const reversedData = [...initialData].reverse();
  const reversedDisplayedFreqs = [...displayedFreqs].reverse();
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
        <p className="text-lg"><strong>Example:</strong> Clause types from 4th-grade students (N = 1,293)</p>
        <div className="flex gap-2">
          <button onClick={handleAnimate} disabled={step > -1} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400">
            <PlayCircle size={18} /> Animate
          </button>
          <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
            <RefreshCw size={18} /> Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Data Table</h3>
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2 text-left">Clause Type</th>
                <th className="border p-2 text-right">Freq</th>
                <th className="border p-2 text-right">Cum Freq</th>
              </tr>
            </thead>
            <tbody>
              {reversedData.map((item, index) => {
                const currentStepIndex = initialData.length - 1 - step;
                const isActive = index === currentStepIndex;
                const isPrev = index === currentStepIndex + 1;

                return (
                  <motion.tr
                    key={item.type}
                    initial={{ opacity: 0.8 }}
                    animate={{ 
                      backgroundColor: isActive || isPrev ? '#fefce8' : '#ffffff',
                      opacity: step === -1 || index >= currentStepIndex ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <td className="border p-2">{item.type}</td>
                    <td className={`border p-2 text-right font-bold ${isActive ? 'text-red-500' : ''}`}>{item.freq}</td>
                    <td className="border p-2 text-right font-bold text-blue-600">
                      <AnimatePresence>
                        {step !== -1 && (
                            <motion.span
                                key={reversedDisplayedFreqs[index]}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                {reversedDisplayedFreqs[index] > 0 ? reversedDisplayedFreqs[index] : ''}
                            </motion.span>
                        )}
                        {step === -1 && (index === reversedData.length - 1 ? item.cumFreq : '')}
                      </AnimatePresence>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="font-semibold mb-3">How it Works</h3>
          <div className="bg-blue-50 p-4 rounded border-2 border-blue-300 space-y-3">
             <p className="text-center text-lg font-mono">$cum\;f = \text{successive additions of frequency}$</p>
             <p className="text-sm text-gray-700">The animation shows how the frequency ($f$) of each row is added to the cumulative frequency ($cum\;f$) of the row below it. This process continues from the least frequent to the most frequent category.</p>
          </div>
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Key point:</strong> Data arranged from most to least frequent. Cumulative frequency starts from the bottom of the list and adds upwards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ANIMATION COMPONENT FOR SLIDE 4: Percent & Proportion ---
const PercentageAnimator = () => {
  const [isStarted, setIsStarted] = useState(false);
  const data = { oral: 28.0, written: 1.5 };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
           <p className="font-semibold mb-2">Proportion</p>
           <p className="font-mono text-lg">$p = \frac{\text{number of X}}{\text{total}}$</p>
         </div>
         <div className="bg-green-50 p-4 rounded border-2 border-green-300">
           <p className="font-semibold mb-2">Percentage</p>
           <p className="font-mono text-lg">$\text{Percentage} = 100 \times p$</p>
         </div>
      </div>
       <div className="p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Visualizing Oral vs. Written Fragments</h3>
           <button onClick={() => setIsStarted(true)} disabled={isStarted} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400">
            <PlayCircle size={18} /> Visualize
          </button>
        </div>
        <div className="space-y-4">
          {/* Oral */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-700">Oral Fragments (194 / 684)</span>
              {isStarted && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="font-bold text-xl text-blue-600">{data.oral}%</motion.span>}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <motion.div 
                className="bg-blue-500 h-6 rounded-full"
                initial={{ width: '0%' }}
                animate={isStarted ? { width: `${data.oral}%` } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>
          {/* Written */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-700">Written Fragments (7 / 469)</span>
              {isStarted && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="font-bold text-xl text-green-600">{data.written}%</motion.span>}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <motion.div 
                className="bg-green-500 h-6 rounded-full"
                initial={{ width: '0%' }}
                animate={isStarted ? { width: `${data.written}%` } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500 text-sm">
        <strong>Important:</strong> Always report both raw frequencies ($n$) and percentages to give readers full context. The animation highlights the huge difference in fragment use (28% vs 1.5%).
      </div>
    </div>
  );
};

// --- ANIMATION COMPONENT FOR SLIDE 5: Rates & Ratios ---
const RateRatioAnimator = () => {
    const [rateKey, setRateKey] = useState(0);
    const [ratioKey, setRatioKey] = useState(0);
    const [activeRate, setActiveRate] = useState({ name: 'Spanish LEP', value: 22 });
    const rates = [
        { name: 'Spanish LEP', value: 22, color: 'bg-blue-500' },
        { name: 'Korean LEP', value: 3, color: 'bg-red-500' },
        { name: 'Vietnamese LEP', value: 8, color: 'bg-green-500' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.02 }
        }
    };
    const itemVariants = {
        hidden: { scale: 0 },
        visible: { scale: 1 }
    };
    
    return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            {/* Rate Section */}
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-3 text-blue-700">Rate (per 100)</h3>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Language Classification</p>
                <div className="flex gap-2 mb-3">
                    {rates.map(r => (
                        <button key={r.name} onClick={() => { setActiveRate(r); setRateKey(prev => prev + 1); }} className={`px-2 py-1 text-xs rounded text-white ${r.color}`}>
                            {r.name}
                        </button>
                    ))}
                </div>
                <motion.div key={rateKey} variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <motion.div key={i} variants={itemVariants} className={`w-4 h-4 rounded-sm ${i < activeRate.value ? activeRate.color : 'bg-gray-200'}`} />
                    ))}
                </motion.div>
                <p className="text-center font-bold mt-2">{activeRate.value} per 100</p>
              </div>
            </div>
            
            {/* Ratio Section */}
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-3 text-green-700">Ratio</h3>
               <div className="bg-white p-3 rounded border">
                 <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-sm">Teacher vs. Student Talk</p>
                    <button onClick={() => setRatioKey(p => p + 1)} className="flex items-center gap-1 px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">
                        <RefreshCw size={12} /> Animate
                    </button>
                 </div>
                <div key={ratioKey} className="flex justify-around items-end h-32">
                    <div className="text-center">
                        <motion.div initial={{ height: '80%' }} animate={{ height: '60%' }} transition={{ duration: 1.5, delay: 0.5 }} className="w-12 bg-purple-500 rounded-t-md mx-auto" />
                        <p className="text-xs mt-1">Teacher</p>
                        <motion.p initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5, delay: 2 }} className="font-bold">350</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }} className="font-bold">2.8</motion.p>
                    </div>
                    <motion.p initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5, delay: 2 }} className="font-mono text-2xl pb-4">:</motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }} className="font-mono text-2xl pb-4">:</motion.p>
                    <div className="text-center">
                        <motion.div initial={{ height: '28.5%' }} animate={{ height: '21.4%' }} transition={{ duration: 1.5, delay: 0.5 }} className="w-12 bg-pink-500 rounded-t-md mx-auto" />
                        <p className="text-xs mt-1">Student</p>
                        <motion.p initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 0.5, delay: 2 }} className="font-bold">125</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.5 }} className="font-bold">1</motion.p>
                    </div>
                </div>
               </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
            <p className="text-sm"><strong>Key insight:</strong> Rates and ratios convert open-ended frequencies into comparable closed-group measures, making it easier to understand relationships in the data.</p>
          </div>
        </div>
    );
};


const FrequencyDataPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title (NOW UPDATED)
    {
      title: "Chapter 5",
      subtitle: "Coding and Displaying Frequency Data",
      content: (
        <div className="flex flex-col items-center justify-between h-full text-center">
          {/* Top Section: Logo */}
          <img 
            src="/En-Logo.png" 
            alt="Tarbiat Modares University Logo" 
            className="h-24 object-contain"
          />

          {/* Middle Section: Title */}
          <div className="space-y-4">
            <div className="text-6xl font-bold text-blue-600">Chapter 5</div>
            <div className="text-3xl font-semibold" style={{ color: '#004422' }}>Coding and Displaying Frequency Data</div>
            <div className="text-xl text-gray-500 mt-2">Making Numbers Meaningful</div>
          </div>

          {/* Bottom Section: Presenter Info & Source */}
          <div>
            <div className="space-y-1">
                <p className="text-lg font-semibold" style={{ color: '#004422' }}>Navid Khiyavi</p>
                <p className="text-sm text-gray-600">Ph.D. Student in Applied Linguistics</p>
                <p className="text-sm text-gray-600">Department of English Language Teaching</p>
                <p className="text-sm text-gray-600">Faculty of Humanities</p>
                <p className="text-sm text-gray-600">Tarbiat Modares University</p>
            </div>
            <div className="text-xs text-gray-400 mt-8 italic">
                Source: Evelyn Hatch, Anne Lazaraton. The Research Manual. Design and Statistics for Applied Linguistics. Heinle & Heinle Pub (1991).
            </div>
          </div>
        </div>
      )
    },
    
    // Slide 2: Key Concepts
    {
      title: "Key Concepts Overview",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-xl mb-3 text-blue-700">Frequency Measures</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Raw frequency ($f$)</li>
                <li>• Cumulative frequency</li>
                <li>• Relative frequency</li>
                <li>• Percent & proportion</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-xl mb-3 text-green-700">Comparisons</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rates (per 100, per 1000)</li>
                <li>• Ratios (X:Y)</li>
                <li>• Type-token ratio</li>
                <li>• Words per T-unit</li>
              </ul>
            </div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-bold text-xl mb-3 text-purple-700">Visual Displays</h3>
            <div className="text-gray-700">Bar graphs • Histograms • Pie charts • Frequency polygons • Line drawings</div>
          </div>
        </div>
      )
    },

    // Slide 3: Frequency & Cumulative Frequency (ANIMATED)
    {
      title: "Frequency & Cumulative Frequency",
      content: <CumulativeFrequencyAnimator />
    },

    // Slide 4: Percent and Proportion (ANIMATED)
    {
      title: "Relative Frequency: Percent & Proportion",
      content: <PercentageAnimator />
    },

    // Slide 5: Rates and Ratios (ANIMATED)
    {
      title: "Rates and Ratios",
      content: <RateRatioAnimator />
    },

    // Slide 6: Bar Graphs
    {
      title: "Data Display: Bar Graphs",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Bar graphs:</strong> Bars are separate (not touching). Order is arbitrary for nominal data.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-center">Educational Status (Reid, 1987)</h3>
              <BarChart width={280} height={250} data={[
                { name: 'Graduate', value: 424 },
                { name: 'Undergrad', value: 851 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-center">Time Studying English in U.S.</h3>
              <BarChart width={280} height={250} data={[
                { name: '<3 mo', value: 511 },
                { name: '3-6 mo', value: 266 },
                { name: '7-11 mo', value: 133 },
                { name: '12-17 mo', value: 131 },
                { name: '18mo-2yr', value: 48 },
                { name: '>3 yr', value: 53 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </div>
          </div>
        </div>
      )
    },

    // Slide 7: Histograms (VISUALLY CORRECTED)
    {
      title: "Data Display: Histograms",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Histograms:</strong> Bars are connected. Data ordered meaningfully (e.g., by time, score range).</p>
          </div>
          
          <div className="flex justify-center">
            <div>
              <h3 className="font-semibold mb-3 text-center">Time Studying English (Ordered by Duration)</h3>
              <BarChart 
                width={600} 
                height={300} 
                data={[
                  { time: '<3 mos', n: 511 },
                  { time: '3-6 mos', n: 266 },
                  { time: '7-11 mos', n: 133 },
                  { time: '12-17 mos', n: 131 },
                  { time: '18mo-2yr', n: 48 },
                  { time: 'Over 2 yrs', n: 13 },
                  { time: 'Over 3 yrs', n: 53 }
                ]}
                barCategoryGap={0} // This makes the bars touch
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" angle={-20} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="n" fill="#8b5cf6" />
              </BarChart>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded text-sm">
            <strong>Difference from bar graph:</strong> The ordering reflects a meaningful sequence (chronological, numerical), and the connected bars suggest continuity between categories.
          </div>
        </div>
      )
    },

    // Slide 8: Pie Charts
    {
      title: "Data Display: Pie Charts",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Pie charts:</strong> Best for showing parts of a whole. Each slice represents proportion of total.</p>
          </div>
          
          <div className="flex justify-center items-center">
            <div>
              <h3 className="font-semibold mb-3 text-center">Major Fields of Study (Reid, 1987)</h3>
              <PieChart width={500} height={350}>
                <Pie
                  data={[
                    { name: 'Other', value: 420 },
                    { name: 'Business', value: 277 },
                    { name: 'Engineering', value: 268 },
                    { name: 'Humanities', value: 171 },
                    { name: 'Computer Sci', value: 130 },
                    { name: 'Hard Sciences', value: 54 },
                    { name: 'Medicine', value: 43 }
                  ]}
                  cx={250}
                  cy={150}
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#ec4899" />
                  <Cell fill="#6366f1" />
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>
      )
    },

    // Slide 9: Frequency Polygons
    {
      title: "Data Display: Frequency Polygons",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Frequency polygons:</strong> Points connected by lines. Shows shape of distribution. Essential for understanding data patterns.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-center">TOEFL Score Distribution</h3>
              <LineChart width={700} height={250} data={[
                { range: '300-349', n: 2 },
                { range: '350-399', n: 9 },
                { range: '400-449', n: 64 },
                { range: '450-474', n: 74 },
                { range: '475-499', n: 97 },
                { range: '500-524', n: 120 },
                { range: '525-549', n: 104 },
                { range: '550-574', n: 73 },
                { range: '575+', n: 63 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" angle={-20} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="n" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </div>
            
            <div className="bg-purple-50 p-3 rounded text-sm">
              <strong>The polygon shape</strong> reveals the distribution pattern. This term becomes crucial in later statistical discussions about data normality and variance.
            </div>
          </div>
        </div>
      )
    },

    // Slide 10: Overlapping Polygons
    {
      title: "Overlapping Polygons: Comparing Groups",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm"><strong>Overlapping polygons:</strong> Compare distributions across groups using different line styles or colors.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-center">TOEFL Scores by Gender</h3>
            <LineChart width={700} height={300} data={[
              { range: '300-349', males: 1, females: 1 },
              { range: '350-399', males: 5, females: 4 },
              { range: '400-449', males: 35, females: 29 },
              { range: '450-474', males: 40, females: 34 },
              { range: '475-499', males: 52, females: 45 },
              { range: '500-524', males: 65, females: 55 },
              { range: '525-549', males: 58, females: 46 },
              { range: '550-574', males: 38, females: 35 },
              { range: '575+', males: 35, females: 28 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" angle={-20} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="males" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Males" />
              <Line type="monotone" dataKey="females" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 4 }} name="Females" />
            </LineChart>
          </div>
          
          <div className="bg-blue-50 p-3 rounded text-sm">
            <strong>Advantage:</strong> Allows direct visual comparison of distributions. Patterns of similarity or difference become immediately apparent.
          </div>
        </div>
      )
    },

    // Slide 11: Summary
    {
      title: "Key Takeaways",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-blue-700">Why Code & Display?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Raw lists are meaningless</li>
                <li>✓ Summaries reveal patterns</li>
                <li>✓ Visuals communicate quickly</li>
                <li>✓ Comparisons become possible</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-5 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-green-700">Choose Your Display</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Bar graph:</strong> Nominal categories</li>
                <li>• <strong>Histogram:</strong> Ordered categories</li>
                <li>• <strong>Pie chart:</strong> Parts of whole</li>
                <li>• <strong>Polygon:</strong> Distribution shape</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
            <h3 className="font-bold text-lg mb-2">Critical Reminders</h3>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>1. Always report sample size ($n$ or $N$) alongside percentages</li>
              <li>2. Consider whether data should be converted to rates/ratios for comparison</li>
              <li>3. The <em>polygon shape</em> of your distribution matters (more in later chapters!)</li>
              <li>4. Choose displays that make patterns immediately visible</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          {slides[currentSlide].title}
        </h1>
        <div className="text-sm text-gray-600">
          Slide {currentSlide + 1} of {slides.length}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8 min-h-full">
          {slides[currentSlide].subtitle && currentSlide !== 0 && (
            <h2 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
              {slides[currentSlide].subtitle}
            </h2>
          )}
          <div className="h-full">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
        <button
          onClick={prevSlide}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        
        {/* Slide indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={currentSlide === slides.length - 1}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FrequencyDataPresentation;
