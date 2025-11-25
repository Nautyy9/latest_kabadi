import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { TrendingUp, Search, MapPin } from "lucide-react";
import { useState, useMemo } from "react";

interface RateItem {
  id: string;
  name: string;
  rate: string;
  unit: string;
  description: string;
  color: string;
  category: string;
}

const rateItems: RateItem[] = [
  { id: "newspaper", name: "Newspaper", rate: "₹6", unit: "/kg", description: "Old newspapers and print", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "carton", name: "Carton", rate: "₹6", unit: "/kg", description: "Cardboard boxes", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "mix-plastic", name: "Mix Plastic", rate: "₹8", unit: "/kg", description: "Mixed plastic waste", color: "from-blue-400 to-blue-600", category: "Plastic" },
  { id: "books", name: "Books", rate: "₹3", unit: "/kg", description: "Old books and textbooks", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "iron", name: "Iron", rate: "₹22", unit: "/kg", description: "Iron scrap and sheets", color: "from-red-700 to-red-900", category: "Metal" },
  { id: "tin", name: "Tin", rate: "₹20", unit: "/kg", description: "Tin containers", color: "from-slate-400 to-slate-600", category: "Metal" },
  { id: "soft-plastic", name: "Soft Plastic", rate: "₹10", unit: "/kg", description: "Plastic bags and film", color: "from-blue-400 to-blue-600", category: "Plastic" },
  { id: "hard-plastic", name: "Hard Plastic", rate: "₹12", unit: "/kg", description: "Hard plastic items", color: "from-blue-400 to-blue-600", category: "Plastic" },
  { id: "ewaste", name: "E-waste", rate: "₹10", unit: "/kg", description: "Electronic waste", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "aluminum", name: "Aluminum", rate: "₹100", unit: "/kg", description: "Aluminum foil and cans", color: "from-gray-300 to-gray-600", category: "Metal" },
  { id: "steel", name: "Steel", rate: "₹18", unit: "/kg", description: "Steel and mild steel", color: "from-slate-400 to-slate-700", category: "Metal" },
  { id: "copy", name: "Copy", rate: "₹2", unit: "/kg", description: "Copy paper waste", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "brass", name: "Brass", rate: "₹349", unit: "/kg", description: "Brass and brass items", color: "from-yellow-300 to-yellow-600", category: "Metal" },
  { id: "copper", name: "Copper", rate: "₹220", unit: "/kg", description: "Copper wire and sheets", color: "from-orange-300 to-orange-600", category: "Metal" },
  { id: "inverter-battery", name: "Inverter Battery", rate: "₹35", unit: "/kg", description: "Used inverter batteries", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "record-paper", name: "Record Paper", rate: "₹10", unit: "/kg", description: "Record and file papers", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "white-paper", name: "White Paper", rate: "₹4", unit: "/kg", description: "White waste paper", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "laptop", name: "Laptop", rate: "₹249", unit: "/pcs", description: "Old laptops", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "ac-1ton", name: "AC (1 Ton)", rate: "₹2499", unit: "/pcs", description: "1 ton air conditioner", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "ac-1.5ton", name: "AC (1.5 Ton)", rate: "₹4499", unit: "/pcs", description: "1.5 ton air conditioner", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "copper-wire", name: "Copper Wire", rate: "₹59", unit: "/kg", description: "Copper wiring", color: "from-orange-300 to-orange-600", category: "Metal" },
  { id: "washing-machine", name: "Washing Machine", rate: "₹100", unit: "/pcs", description: "Old washing machines", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "ac-2ton", name: "AC (2 Ton)", rate: "₹5499", unit: "/pcs", description: "2 ton air conditioner", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "television-crt", name: "Television (CRT)", rate: "₹100", unit: "/pcs", description: "Old CRT televisions", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "aluminum-wire", name: "Aluminium Wire", rate: "₹30", unit: "/kg", description: "Aluminum wiring", color: "from-gray-300 to-gray-600", category: "Metal" },
  { id: "geyser", name: "Geyser", rate: "₹500", unit: "/pcs", description: "Electric geysers", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "monitor-crt", name: "Monitor (CRT)", rate: "₹149", unit: "/pcs", description: "Old CRT monitors", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "monitor-lcd", name: "Monitor (LCD/LED)", rate: "₹49", unit: "/pcs", description: "LCD/LED monitors", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "cpu", name: "CPU", rate: "₹100", unit: "/pca", description: "Computer CPUs", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "pet-bottle", name: "PET Bottle", rate: "₹5", unit: "/kg", description: "Plastic bottles", color: "from-blue-400 to-blue-600", category: "Plastic" },
  { id: "printer", name: "Printer", rate: "₹25", unit: "/kg", description: "Old printers", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "ups-battery", name: "UPS (with battery)", rate: "₹249", unit: "/pcs", description: "UPS backup systems", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "cooler-plastic", name: "Cooler (Plastic/Fibre)", rate: "₹12", unit: "/kg", description: "Plastic coolers", color: "from-blue-400 to-blue-600", category: "Plastic" },
  { id: "cooler-tin", name: "Cooler (Tin)", rate: "₹15", unit: "/kg", description: "Metal coolers", color: "from-slate-400 to-slate-600", category: "Metal" },
  { id: "other", name: "Other", rate: "₹5", unit: "/pcs", description: "Other materials", color: "from-slate-400 to-slate-600", category: "Other" },
];

const categories = ["All", "Paper", "Plastic", "Metal", "E-waste", "Other"];
const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

function RateCard({ item }: { item: RateItem }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-lg">
      <Card className="overflow-hidden hover-elevate h-full group bg-white dark:bg-slate-900 border-0 shadow-md hover:shadow-xl transition-all duration-300">
        <div className={`h-40 bg-gradient-to-br ${item.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-bold text-white/20 group-hover:text-white/30 transition-all">
              {item.name.charAt(0)}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-1">{item.name}</h3>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
          
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-green-700 dark:text-green-400">{item.rate}</span>
              <span className="text-xs text-green-600 dark:text-green-500 font-semibold">{item.unit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <TrendingUp className="h-4 w-4 stroke-[2]" />
            <span>Best Market Rate</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Rates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("Delhi");

  const filteredItems = useMemo(() => {
    return rateItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-gradient-to-br from-green-50/50 to-white dark:from-green-950/20 dark:to-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-green-700 dark:text-green-400">
              Our Premium Rates
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the best market rates for your scrap materials. Updated daily to ensure maximum value for your recyclables.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter Section */}
            <div className="mb-10">
              {/* Location and Search */}
              <div className="flex gap-3 mb-6 flex-col sm:flex-row">
                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 w-full sm:w-56">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="bg-transparent border-0 outline-none text-foreground w-full text-sm"
                    data-testid="select-location"
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 flex-1">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search any materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-0 outline-none text-foreground w-full text-sm placeholder:text-muted-foreground"
                    data-testid="input-search-materials"
                  />
                </div>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all text-sm ${
                      selectedCategory === cat
                        ? "bg-green-600 dark:bg-green-500 text-white"
                        : "bg-gray-800 dark:bg-gray-700 text-gray-200 hover-elevate"
                    }`}
                    data-testid={`button-category-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <RateCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">No materials found matching your search</p>
                  </div>
                )}
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 rounded-2xl p-8 lg:p-12 border border-green-200/50 dark:border-green-800/50">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
                    Why Choose theKabadi?
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="text-muted-foreground">Best prices updated daily with live market rates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="text-muted-foreground">Transparent pricing with no hidden charges</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="text-muted-foreground">Free pickup from your location within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-600 dark:text-green-400 font-bold text-lg mt-0.5">✓</span>
                      <span className="text-muted-foreground">Instant payment upon verification and weighing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Sell?</h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule a free pickup today and get paid the best rates in the market for your scrap materials.
                  </p>
                  <button 
                    onClick={() => window.location.href = "/#request-pickup"}
                    className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 border-2 border-green-700"
                    data-testid="button-schedule-pickup-rates"
                  >
                    Schedule Free Pickup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
