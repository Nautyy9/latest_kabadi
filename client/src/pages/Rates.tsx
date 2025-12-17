import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import WhyChooseKabadi from "@/components/WhyChooseKabadi";
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
  { id: "mix-plastic", name: "Mix Plastic", rate: "₹8", unit: "/kg", description: "Mixed plastic waste", color: "from-amber-400 to-amber-600", category: "Plastic" },
  { id: "books", name: "Books", rate: "₹3", unit: "/kg", description: "Old books and textbooks", color: "from-amber-300 to-amber-600", category: "Paper" },
  { id: "iron", name: "Iron", rate: "₹22", unit: "/kg", description: "Iron scrap and sheets", color: "from-red-700 to-red-900", category: "Metal" },
  { id: "tin", name: "Tin", rate: "₹20", unit: "/kg", description: "Tin containers", color: "from-slate-400 to-slate-600", category: "Metal" },
  { id: "soft-plastic", name: "Soft Plastic", rate: "₹10", unit: "/kg", description: "Plastic bags and film", color: "from-amber-400 to-amber-600", category: "Plastic" },
  { id: "hard-plastic", name: "Hard Plastic", rate: "₹12", unit: "/kg", description: "Hard plastic items", color: "from-amber-400 to-amber-600", category: "Plastic" },
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
  { id: "pet-bottle", name: "PET Bottle", rate: "₹5", unit: "/kg", description: "Plastic bottles", color: "from-amber-400 to-amber-600", category: "Plastic" },
  { id: "printer", name: "Printer", rate: "₹25", unit: "/kg", description: "Old printers", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "ups-battery", name: "UPS (with battery)", rate: "₹249", unit: "/pcs", description: "UPS backup systems", color: "from-purple-400 to-purple-600", category: "E-waste" },
  { id: "cooler-plastic", name: "Cooler (Plastic/Fibre)", rate: "₹12", unit: "/kg", description: "Plastic coolers", color: "from-amber-400 to-amber-600", category: "Plastic" },
  { id: "cooler-tin", name: "Cooler (Tin)", rate: "₹15", unit: "/kg", description: "Metal coolers", color: "from-slate-400 to-slate-600", category: "Metal" },
  { id: "other", name: "Other", rate: "₹5", unit: "/pcs", description: "Other materials", color: "from-slate-400 to-slate-600", category: "Other" },
];

const categories = ["All", "Paper", "Plastic", "Metal", "E-waste", "Other"];
const locations = ["Delhi", "Mumbai", "Bangalore", "Chennai"];

// Dynamically import images from assets folders and map by basename
const imageModules = {
  ...import.meta.glob<string>("@assets/*.{png,jpg,jpeg,webp}", { eager: true, as: "url" }),
  ...import.meta.glob<string>("@assets/**/*.{png,jpg,jpeg,webp}", { eager: true, as: "url" }),
};

const imageLookup: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.[^.]+$/, "")
      .toLowerCase(),
    url as unknown as string,
  ]),
);

function getImageForItem(item: RateItem): string | undefined {
  const variants = [
    item.id,
    item.name,
    item.name.replace(/\s+/g, "-"),
    item.name.replace(/\s+/g, "_"),
    item.name.replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-"),
  ]
    .filter(Boolean)
    .map((v) => v.toLowerCase());

  for (const key of variants) {
    if (imageLookup[key]) return imageLookup[key];
  }
  return undefined;
}

function RateCard({ item }: { item: RateItem }) {
  return (
    <div className="bg-kabadi-blue-light dark:bg-slate-900/50 p-3 rounded-2xl">
      <Card className="overflow-hidden hover-elevate h-full group bg-white dark:bg-slate-900 border-0 shadow-md hover:shadow-xl transition-all duration-300">
        {(() => {
          const img = getImageForItem(item);
          return img ? (
            <div className="h-40 relative overflow-hidden">
              <img src={img} alt={item.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`h-40 bg-gradient-to-br ${item.color} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl font-bold text-white/20 group-hover:text-white/30 transition-all">
                  {item.name.charAt(0)}
                </div>
              </div>
            </div>
          );
        })()}
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-1">{item.name}</h3>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
          
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-kabadi-emphasis">{item.rate}</span>
              <span className="text-xs text-kabadi-primary font-semibold">{item.unit}</span>
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
        <section className="relative py-20 overflow-visible">
          <div className="absolute inset-0 -top-12  bg-gradient-to-b from-green-50 via-green-50/60 to-transparent -z-10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 ">
              Our Premium Rates
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto ">
              Get the best market rates for your scrap materials. Updated daily to ensure maximum value for your recyclables.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search and Filter Section */}
            <div className="mb-10">
              {/* Location and Search */}
              <div className="flex gap-3 mb-6 flex-col sm:flex-row">
                <div className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 w-full sm:w-56">
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

                <div className="flex items-center gap-2 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 bg-white dark:bg-slate-800 flex-1">
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
                        ? "bg-kabadi-emphasis text-white"
                        : "bg-slate-700 dark:bg-slate-600 text-slate-200 hover-elevate"
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
            <WhyChooseKabadi className="mt-16" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
