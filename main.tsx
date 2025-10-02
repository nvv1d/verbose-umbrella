import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const FrequencyDataPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 1: Title
    {
      title: "Chapter 5",
      subtitle: "Coding and Displaying Frequency Data",
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="text-6xl font-bold text-blue-600">Chapter 5</div>
          <div className="text-3xl font-semibold text-gray-700">Coding and Displaying Frequency Data</div>
          <div className="text-xl text-gray-500 mt-8">Making Numbers Meaningful</div>
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
                <li>• Raw frequency (f)</li>
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

    // Slide 3: Frequency & Cumulative Frequency
    {
      title: "Frequency & Cumulative Frequency",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <p className="text-lg mb-4"><strong>Example:</strong> Clause types from 4th-grade students (N = 1,293)</p>
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
                  <tr><td className="border p-2">Transitive</td><td className="border p-2 text-right">587</td><td className="border p-2 text-right">1293</td></tr>
                  <tr><td className="border p-2">Pred nominative</td><td className="border p-2 text-right">197</td><td className="border p-2 text-right">706</td></tr>
                  <tr><td className="border p-2">Pred adjective</td><td className="border p-2 text-right">155</td><td className="border p-2 text-right">509</td></tr>
                  <tr><td className="border p-2">Question</td><td className="border p-2 text-right">86</td><td className="border p-2 text-right">354</td></tr>
                  <tr><td className="border p-2">Possessive</td><td className="border p-2 text-right">81</td><td className="border p-2 text-right">268</td></tr>
                  <tr><td className="border p-2">Other</td><td className="border p-2 text-right">187</td><td className="border p-2 text-right">187</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Formula</h3>
              <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
                <p className="text-center text-lg font-mono">cum f = successive additions of frequency</p>
              </div>
              <div className="mt-6 text-sm text-gray-600">
                <p><strong>Key point:</strong> Data arranged from most to least frequent. Each cumulative value adds the current frequency to all previous frequencies.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Slide 4: Percent and Proportion
    {
      title: "Relative Frequency: Percent & Proportion",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-4 rounded border-2 border-blue-300">
              <p className="font-semibold mb-2">Proportion</p>
              <p className="font-mono text-lg">number of X / total</p>
              <p className="text-sm text-gray-600 mt-2">Example: 0.68</p>
            </div>
            <div className="bg-green-50 p-4 rounded border-2 border-green-300">
              <p className="font-semibold mb-2">Percentage</p>
              <p className="font-mono text-lg">100 × proportion</p>
              <p className="text-sm text-gray-600 mt-2">Example: 68%</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Oral vs Written Clauses</h3>
            <table className="w-full text-sm border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2 text-left">Clause Type</th>
                  <th className="border p-2 text-right">Oral n</th>
                  <th className="border p-2 text-right">Oral %</th>
                  <th className="border p-2 text-right">Written n</th>
                  <th className="border p-2 text-right">Written %</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">Simple Finite</td><td className="border p-2 text-right">352</td><td className="border p-2 text-right">51.5%</td><td className="border p-2 text-right">257</td><td className="border p-2 text-right">54.8%</td></tr>
                <tr><td className="border p-2">Fragment</td><td className="border p-2 text-right">194</td><td className="border p-2 text-right">28.0%</td><td className="border p-2 text-right">7</td><td className="border p-2 text-right">1.5%</td></tr>
                <tr><td className="border p-2">Complex</td><td className="border p-2 text-right">44</td><td className="border p-2 text-right">6.5%</td><td className="border p-2 text-right">151</td><td className="border p-2 text-right">32.2%</td></tr>
                <tr><td className="border p-2">Other</td><td className="border p-2 text-right">94</td><td className="border p-2 text-right">14.0%</td><td className="border p-2 text-right">54</td><td className="border p-2 text-right">11.5%</td></tr>
                <tr className="bg-gray-100 font-semibold"><td className="border p-2">Total</td><td className="border p-2 text-right">684</td><td className="border p-2 text-right">100%</td><td className="border p-2 text-right">469</td><td className="border p-2 text-right">100%</td></tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500 text-sm">
            <strong>Important:</strong> Always report both raw frequencies (n) and percentages to give readers full context.
          </div>
        </div>
      )
    },

    // Slide 5: Rates and Ratios
    {
      title: "Rates and Ratios",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-3 text-blue-700">Rate</h3>
              <p className="font-mono mb-2">Rate = frequency per unit</p>
              <p className="text-sm mb-3">Common units: per 100, per 1,000</p>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm">Example: Language Classification</p>
                <table className="w-full text-xs mt-2">
                  <tr><td>Spanish LEP:</td><td className="text-right font-semibold">22 per 100</td></tr>
                  <tr><td>Korean LEP:</td><td className="text-right font-semibold">3 per 100</td></tr>
                  <tr><td>Vietnamese LEP:</td><td className="text-right font-semibold">8 per 100</td></tr>
                </table>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-3 text-green-700">Ratio</h3>
              <p className="font-mono mb-2">Ratio = X : Y</p>
              <p className="text-sm mb-3">Compares two quantities</p>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-sm mb-2">Common Ratios in Research:</p>
                <ul className="text-xs space-y-1">
                  <li>• <strong>Type-token ratio:</strong> unique words / total words</li>
                  <li>• <strong>Words per T-unit:</strong> syntactic complexity</li>
                  <li>• <strong>Teacher-student talk:</strong> 350:125 = 2.8:1</li>
                  <li>• <strong>Male-female:</strong> 360:80 = 100:22</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-500">
            <p className="text-sm"><strong>Key insight:</strong> Rates and ratios convert open-ended frequencies into comparable closed-group measures.</p>
          </div>
        </div>
      )
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

    // Slide 7: Histograms
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
              <BarChart width={600} height={300} data={[
                { time: '<3 mos', n: 511 },
                { time: '3-6 mos', n: 266 },
                { time: '7-11 mos', n: 133 },
                { time: '12-17 mos', n: 131 },
                { time: '18mo-2yr', n: 48 },
                { time: 'Over 2 yrs', n: 13 },
                { time: 'Over 3 yrs', n: 53 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" angle={-20} textAnchor="end" height={70} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="n" fill="#8b5cf6" />
              </BarChart>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded text-sm">
            <strong>Difference from bar graph:</strong> The ordering reflects a meaningful sequence (chronological, numerical), suggesting continuity between categories.
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
              <li>1. Always report sample size (n or N) alongside percentages</li>
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
          {slides[currentSlide].subtitle && (
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
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
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
              className={`w-2 h-2 rounded-full transition ${
                index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
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
