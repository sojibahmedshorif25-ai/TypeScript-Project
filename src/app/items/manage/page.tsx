"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import ConfirmationModal from "@/components/ConfirmationModal";
import EmptyState from "@/components/EmptyState";
import { PageLoader } from "@/components/LoadingSpinner";
import { useUserItems, useDeleteItem } from "@/hooks/useItems";
import { Search, Trash2, Eye, Plus, ListOrdered } from "lucide-react";

function ManageItemsContent() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  const { data, isLoading } = useUserItems({ search: search || undefined, page, limit: 10 });
  const deleteItem = useDeleteItem();

  const items = data?.items || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteItem.mutateAsync(deleteId);
      setDeleteId(null);
      setDeleteTitle("");
    } catch {
      // handled by mutation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <ListOrdered className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Items</h1>
                <p className="text-gray-600 mt-1">View, edit, and delete your listings</p>
              </div>
            </div>
            <Link href="/items/add"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 self-start">
              <Plus className="w-4 h-4" />
              Add New
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search your items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        {isLoading ? (
          <PageLoader />
        ) : items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
            <EmptyState
              title={search ? "No matching items" : "No items yet"}
              description={search ? "Try a different search term" : "Start by adding your first listing"}
              action={!search ? { label: "Add Your First Item", href: "/items/add" } : undefined}
            />
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Item</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Price</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Date</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {items.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                              {item.images?.[0] ? (
                                <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-400">
                                  {item.title.slice(0, 2).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{item.title}</p>
                              <p className="text-xs text-gray-500 truncate max-w-[200px]">{item.shortDescription}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded capitalize">{item.category}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm font-semibold text-gray-900">${item.price.toLocaleString()}</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/items/${item._id}`}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button onClick={() => { setDeleteId(item._id); setDeleteTitle(item.title); }}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Previous
                </button>
                <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <ConfirmationModal
        open={!!deleteId}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteTitle}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => { setDeleteId(null); setDeleteTitle(""); }}
        loading={deleteItem.isPending}
      />
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
