import Link from "next/link";
import type { ItemType } from "@/types";
import { getItemImage } from "@/lib/imagePlaceholder";
import { MapPin, Calendar, Star } from "lucide-react";

interface CardProps {
  item: ItemType;
}

export default function Card({ item }: CardProps) {
  const imageUrl = getItemImage(item.images, item.title, item.category);

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full card-hover hover:shadow-xl hover:border-blue-100">
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        <img src={imageUrl} alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-semibold rounded-lg capitalize shadow-sm">
            {item.category}
          </span>
          {item.priority && (
            <span className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize shadow-sm ${
              item.priority === "high" ? "bg-red-500/90 text-white" :
              item.priority === "medium" ? "bg-amber-500/90 text-white" :
              "bg-emerald-500/90 text-white"
            }`}>
              {item.priority}
            </span>
          )}
        </div>
        {item.rating > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-800">{item.rating.toFixed(1)}</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base mb-1.5 line-clamp-1 group-hover:text-blue-700 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1 leading-relaxed">
          {item.shortDescription}
        </p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${item.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {item.location ? item.location.split(",")[0] : "N/A"}
            </span>
            {item.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
            )}
          </div>
        </div>
        <Link href={`/items/${item._id}`}
          className="w-full text-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-medium rounded-xl transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-300">
          View Details
        </Link>
      </div>
    </div>
  );
}
