import { useState, useEffect } from "react";
import { Search, Filter, X, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface SearchFilters {
  query: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  category?: string;
  [key: string]: string | Date | undefined;
}

interface AdvancedSearchProps {
  placeholder?: string;
  onSearch: (filters: SearchFilters) => void;
  filterOptions?: {
    label: string;
    key: string;
    options: { value: string; label: string }[];
  }[];
  showDateFilter?: boolean;
  debounceMs?: number;
}

export function AdvancedSearch({
  placeholder = "Search...",
  onSearch,
  filterOptions = [],
  showDateFilter = false,
  debounceMs = 300,
}: AdvancedSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({ query: "" });
  const [showFilters, setShowFilters] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch({ ...filters, query });
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, filters, debounceMs, onSearch]);

  const handleFilterChange = (key: string, value: string | Date | undefined) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (!value) {
        delete updated[key];
      }
      return updated;
    });
  };

  const clearFilters = () => {
    setFilters({ query });
    setQuery("");
  };

  const activeFilterCount = Object.keys(filters).filter((k) => k !== "query" && filters[k]).length;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-600 text-white text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Filters</h4>
                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto py-1 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Custom Filter Options */}
              {filterOptions.map((filterOption) => (
                <div key={filterOption.key} className="space-y-2">
                  <label className="text-sm font-medium">{filterOption.label}</label>
                  <Select
                    value={filters[filterOption.key] as string}
                    onValueChange={(value) => handleFilterChange(filterOption.key, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${filterOption.label.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
                      {filterOption.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              {/* Date Range Filter */}
              {showDateFilter && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateFrom ? format(filters.dateFrom, "PPP") : "From"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateFrom}
                          onSelect={(date) => handleFilterChange("dateFrom", date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {filters.dateTo ? format(filters.dateTo, "PPP") : "To"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filters.dateTo}
                          onSelect={(date) => handleFilterChange("dateTo", date)}
                          disabled={(date) =>
                            filters.dateFrom ? date < filters.dateFrom : false
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (key === "query" || !value) return null;

            let displayValue = value;
            if (value instanceof Date) {
              displayValue = format(value, "PP");
            } else if (typeof value === "string") {
              // Try to find label from filterOptions
              const option = filterOptions
                .find((f) => f.key === key)
                ?.options.find((o) => o.value === value);
              displayValue = option?.label || value;
            }

            return (
              <Badge
                key={key}
                variant="secondary"
                className="gap-1 pr-1"
              >
                <span className="text-xs">
                  {key}: {displayValue}
                </span>
                <button
                  onClick={() => handleFilterChange(key, undefined)}
                  className="ml-1 hover:bg-muted rounded-sm p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
