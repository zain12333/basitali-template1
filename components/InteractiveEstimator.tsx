'use client';

import React, { useState, useId } from 'react';
import { Calculator, MessageSquare, Check, Sparkles, RefreshCw, Ruler, ShieldCheck, ArrowRight } from 'lucide-react';
import { CLIENT_INFO } from '@/lib/data';

interface ProductConfig {
  id: string;
  name: string;
  baseSqFtRate: number; // PKR per sqft
  minWidth: number;
  minHeight: number;
  defaultWidth: number;
  defaultHeight: number;
}

const PRODUCTS: ProductConfig[] = [
  {
    id: 'sliding-window',
    name: 'Aluminum Sliding Window',
    baseSqFtRate: 650,
    minWidth: 3,
    minHeight: 3,
    defaultWidth: 6,
    defaultHeight: 4
  },
  {
    id: 'shower-cabin',
    name: 'Frameless Glass Shower Cabin',
    baseSqFtRate: 950,
    minWidth: 3,
    minHeight: 6,
    defaultWidth: 4,
    defaultHeight: 7
  },
  {
    id: 'glass-partition',
    name: 'Office Tempered Glass Partition',
    baseSqFtRate: 850,
    minWidth: 4,
    minHeight: 6,
    defaultWidth: 10,
    defaultHeight: 9
  },
  {
    id: 'shop-front',
    name: 'Commercial Shop Front Facade',
    baseSqFtRate: 1100,
    minWidth: 6,
    minHeight: 7,
    defaultWidth: 12,
    defaultHeight: 10
  },
  {
    id: 'sliding-patio',
    name: 'Heavy Duty Sliding Patio Door',
    baseSqFtRate: 880,
    minWidth: 5,
    minHeight: 7,
    defaultWidth: 8,
    defaultHeight: 8
  },
  {
    id: 'vertical-blinds',
    name: 'Vertical / Roller Blinds',
    baseSqFtRate: 320,
    minWidth: 2,
    minHeight: 3,
    defaultWidth: 5,
    defaultHeight: 5
  }
];

const GLASS_OPTIONS = [
  { id: '8mm-clear', name: '8mm Clear Tempered Safety Glass', multiplier: 1.0 },
  { id: '10mm-clear', name: '10mm Heavy Architectural Tempered Glass', multiplier: 1.25 },
  { id: '12mm-ultra', name: '12mm Commercial High-Strength Tempered Glass', multiplier: 1.45 },
  { id: 'double-glazed', name: 'Double Glazed Acoustic Insulated (5mm+12A+5mm)', multiplier: 1.7 }
];

const FINISHES = [
  { id: 'matte-black', name: 'Premium Jet Black Matte (Powder Coated)', color: '#171717' },
  { id: 'champagne', name: 'Champagne Bronze Anodized', color: '#92704f' },
  { id: 'silver', name: 'Silver Electrolytic Anodized', color: '#9ca3af' },
  { id: 'pure-white', name: 'Architectural Pure White (RAL 9016)', color: '#f3f4f6' }
];

export default function InteractiveEstimator() {
  const [selectedProduct, setSelectedProduct] = useState<ProductConfig>(PRODUCTS[0]);
  const [width, setWidth] = useState<number>(PRODUCTS[0].defaultWidth);
  const [height, setHeight] = useState<number>(PRODUCTS[0].defaultHeight);
  const [selectedGlass, setSelectedGlass] = useState(GLASS_OPTIONS[0]);
  const [selectedFinish, setSelectedFinish] = useState(FINISHES[0]);
  const [quantity, setQuantity] = useState<number>(1);

  // Math Calculations
  const sqFtPerUnit = width * height;
  const totalSqFt = sqFtPerUnit * quantity;
  const estimatedCost = Math.round(totalSqFt * selectedProduct.baseSqFtRate * selectedGlass.multiplier);
  const lowerEstimate = Math.round(estimatedCost * 0.95);
  const upperEstimate = Math.round(estimatedCost * 1.10);

  const handleProductChange = (prod: ProductConfig) => {
    setSelectedProduct(prod);
    setWidth(prod.defaultWidth);
    setHeight(prod.defaultHeight);
  };

  const whatsappMessage = `Hello Basit Ali Aluminum, I used your online measurement estimator:
- Product: ${selectedProduct.name}
- Dimensions: ${width} ft (Width) x ${height} ft (Height)
- Quantity: ${quantity} unit(s)
- Total Area: ${totalSqFt} sq.ft
- Glass Type: ${selectedGlass.name}
- Frame Finish: ${selectedFinish.name}
- Estimated Budget Range: PKR ${lowerEstimate.toLocaleString()} - ${upperEstimate.toLocaleString()}

Please confirm availability and schedule a free site measurement at my location in Lahore.`;

  return (
    <section id="calculator" className="bg-neutral-900 text-white py-20 sm:py-28 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#E31E27] uppercase mb-2">
            Transparent Pricing Tool
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Interactive Custom Cost Estimator
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Calculate approximate pricing based on your room dimensions, glass gauge, and aluminum finish. Includes free measurement across all Lahore neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
            {/* Step 1: Select Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                1. Select Product / Installation Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => handleProductChange(prod)}
                    className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                      selectedProduct.id === prod.id
                        ? 'bg-[#E31E27E8] border-[#E31E27] text-white shadow-sm ring-1 ring-[#E31E27]'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div className="truncate">{prod.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-red-500" />
                  2. Approximate Dimensions (In Feet)
                </label>
                <span className="text-xs text-neutral-400">
                  Area per unit: <strong className="text-white font-mono">{sqFtPerUnit} sq.ft</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Width:</span>
                    <span className="text-white font-mono font-bold">{width} ft</span>
                  </div>
                  <input
                    type="range"
                    min={selectedProduct.minWidth}
                    max={24}
                    step={0.5}
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className="w-full accent-[#E31E27] cursor-pointer"
                    aria-label="Adjust width in feet"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Height:</span>
                    <span className="text-white font-mono font-bold">{height} ft</span>
                  </div>
                  <input
                    type="range"
                    min={selectedProduct.minHeight}
                    max={14}
                    step={0.5}
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className="w-full accent-[#E31E27] cursor-pointer"
                    aria-label="Adjust height in feet"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Quantity:</span>
                    <span className="text-white font-mono font-bold">{quantity} item(s)</span>
                  </div>
                  <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-neutral-400 hover:text-white font-bold"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-white text-sm">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-neutral-400 hover:text-white font-bold"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Glass Specification */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                3. Choose Safety Glass Gauge
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {GLASS_OPTIONS.map((glass) => (
                  <button
                    key={glass.id}
                    onClick={() => setSelectedGlass(glass)}
                    className={`p-3 text-left rounded-xl border text-xs font-medium transition-all ${
                      selectedGlass.id === glass.id
                        ? 'bg-neutral-900 border-[#E31E27] text-white ring-1 ring-[#E31E27]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-white">{glass.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Aluminum Finish */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                4. Aluminum Powder Coat / Anodized Finish
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FINISHES.map((fin) => (
                  <button
                    key={fin.id}
                    onClick={() => setSelectedFinish(fin)}
                    className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                      selectedFinish.id === fin.id
                        ? 'bg-neutral-900 border-[#E31E27] text-white ring-1 ring-[#E31E27]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-white/30 shrink-0"
                      style={{ backgroundColor: fin.color }}
                    />
                    <span className="truncate font-medium">{fin.name.split(' (')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black p-6 sm:p-8 rounded-2xl border-2 border-[#E31E27] shadow-2xl space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E31E27]">
                Summary &amp; Quotation Preview
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                All estimates include fabrication, hardware &amp; installation in Lahore.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1.5 border-b border-neutral-800/80 text-neutral-300">
                <span>Unit Dimensions:</span>
                <span className="font-mono text-white font-semibold">
                  {width} ft × {height} ft ({sqFtPerUnit} sq.ft)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/80 text-neutral-300">
                <span>Total Calculated Area:</span>
                <span className="font-mono text-white font-semibold">
                  {totalSqFt} sq.ft ({quantity} unit{quantity > 1 ? 's' : ''})
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/80 text-neutral-300">
                <span>Glass Selection:</span>
                <span className="text-white font-semibold truncate max-w-[200px] text-right">
                  {selectedGlass.name.split(' ')[0]} {selectedGlass.name.split(' ')[1]}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-800/80 text-neutral-300">
                <span>Frame Finish:</span>
                <span className="text-white font-semibold truncate max-w-[180px] text-right">
                  {selectedFinish.name.split(' (')[0]}
                </span>
              </div>
              <div className="flex justify-between py-1.5 text-neutral-300">
                <span>On-Site Measurement:</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">
                  FREE in Lahore (Rs. 0)
                </span>
              </div>
            </div>

            {/* Estimated Price Range Box */}
            <div className="bg-neutral-900/90 p-5 rounded-xl border border-[#E31E27]/70 text-center space-y-1">
              <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                Estimated Cost Range (PKR)
              </p>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#E31E27] font-mono tracking-tight">
                Rs. {lowerEstimate.toLocaleString()} - {upperEstimate.toLocaleString()}
              </div>
              <p className="text-[11px] text-neutral-400 pt-1">
                *Subject to exact physical site measurement &amp; structural profile requirements.
              </p>
            </div>

            {/* Direct WhatsApp Pre-filled CTA */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/923202740066?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Specification to WhatsApp</span>
              </a>

              <a
                href="#contact"
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 border border-white/20 transition-colors"
              >
                <span>Book Free Measurement At Your Address</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Includes 5-Year Workmanship &amp; Seal Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
