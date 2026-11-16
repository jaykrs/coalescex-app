"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

interface Subscription {
  id: string;
  email: string;
  status: "PENDING" | "SUBSCRIBED" | "UNSUBSCRIBED";
  subscribedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionsResponse {
  subscriptions: Subscription[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats: {
    totalSubscribers: number;
    pendingSubscribers: number;
    confirmedSubscribers: number;
    unsubscribedUsers: number;
  };
}

export default function AdminSubscriptionsPage() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  // State for delete modal
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingEmail, setDeletingEmail] = useState<string | null>(null);

  // State for action feedback
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );

  const { data, isLoading, isError, error, refetch } = useQuery<SubscriptionsResponse>({
    queryKey: ["admin-subscriptions", page, limit, search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await api.get(`/subscriptions?${params.toString()}`);
      return res.data;
    },
  });

  // Mutation to update subscription status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await api.patch(`/subscriptions/${id}/status`, { status });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["admin-subscriptions"] });
      setFeedback({
        type: "success",
        message: data.message || "Subscription status updated successfully.",
      });
      setTimeout(() => setFeedback(null), 4000);
    },
    onError: (err: any) => {
      setFeedback({
        type: "error",
        message: err?.response?.data?.error?.message || "Failed to update subscription status.",
      });
      setTimeout(() => setFeedback(null), 5000);
    },
  });

  // Mutation to delete a subscription
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/subscriptions/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subscriptions"] });
      setDeletingId(null);
      setDeletingEmail(null);
      setFeedback({
        type: "success",
        message: "Subscriber removed successfully.",
      });
      setTimeout(() => setFeedback(null), 4000);
    },
    onError: (err: any) => {
      setFeedback({
        type: "error",
        message: err?.response?.data?.error?.message || "Failed to delete subscriber.",
      });
      setTimeout(() => setFeedback(null), 5000);
    },
  });

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  function handleClearSearch() {
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  function handleStatusFilterChange(newStatus: string) {
    setStatusFilter(newStatus);
    setPage(1);
  }

  const stats = data?.stats;
  const subscriptions = data?.subscriptions ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: 10, total: 0, totalPages: 1 };

  return (
    <div className="space-y-8">
      {/* SECTION 1: HEADER & STATS SUMMARY CARDS */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink">Newsletter Subscriptions</h2>
            <p className="text-xs sm:text-sm text-muted mt-0.5">
              Review, filter, and manage email newsletter subscribers.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="self-start sm:self-auto rounded-lg border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink hover:bg-paper transition flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>🔄</span> Refresh
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Total Subscribers
            </p>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-ink">
              {stats ? stats.totalSubscribers : "—"}
            </p>
            <p className="text-[11px] text-muted mt-1">All registered subscriptions</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Pending Subscribers
            </p>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-amber-900">
              {stats ? stats.pendingSubscribers : "—"}
            </p>
            <p className="text-[11px] text-amber-700 mt-1">Awaiting confirmation</p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Confirmed Subscribers
            </p>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-emerald-900">
              {stats ? stats.confirmedSubscribers : "—"}
            </p>
            <p className="text-[11px] text-emerald-700 mt-1">Active subscribers</p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4 shadow-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Unsubscribed Users
            </p>
            <p className="mt-2 font-mono text-2xl sm:text-3xl font-bold text-gray-700">
              {stats ? stats.unsubscribedUsers : "—"}
            </p>
            <p className="text-[11px] text-muted mt-1">Opted out from newsletters</p>
          </div>
        </div>
      </div>

      {/* ACTION FEEDBACK ALERT */}
      {feedback && (
        <div
          className={`rounded-xl border p-4 text-sm flex items-center justify-between shadow-xs transition ${
            feedback.type === "success"
              ? "border-emerald-300 bg-emerald-50 text-emerald-900"
              : "border-red-300 bg-red-50 text-red-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{feedback.type === "success" ? "✅" : "⚠️"}</span>
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-xs font-semibold opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* SECTION 2: SEARCH & FILTER CONTROLS */}
      <div className="rounded-xl border border-line bg-surface p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 max-w-md">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search subscribers by email…"
                className="w-full rounded-lg border border-line bg-surface px-3.5 py-2 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-transparent transition"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition shadow-xs whitespace-nowrap cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "ALL", label: "All" },
              { id: "SUBSCRIBED", label: "Confirmed" },
              { id: "PENDING", label: "Pending" },
              { id: "UNSUBSCRIBED", label: "Unsubscribed" },
            ].map((tab) => {
              const active = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleStatusFilterChange(tab.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                    active
                      ? "bg-brand-600 text-white shadow-xs"
                      : "bg-paper text-muted hover:text-ink hover:bg-line border border-line"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Indicators */}
        {(search || statusFilter !== "ALL") && (
          <div className="flex items-center gap-2 text-xs text-muted pt-2 border-t border-line">
            <span>Active filters:</span>
            {search && (
              <span className="rounded bg-brand-50 text-brand-700 px-2 py-0.5 border border-brand-100 flex items-center gap-1">
                Search: &ldquo;{search}&rdquo;
                <button onClick={handleClearSearch} className="hover:text-black">
                  ✕
                </button>
              </span>
            )}
            {statusFilter !== "ALL" && (
              <span className="rounded bg-paper px-2 py-0.5 border border-line flex items-center gap-1">
                Status: {statusFilter}
                <button
                  onClick={() => handleStatusFilterChange("ALL")}
                  className="hover:text-black"
                >
                  ✕
                </button>
              </span>
            )}
            <button
              onClick={() => {
                handleClearSearch();
                handleStatusFilterChange("ALL");
              }}
              className="text-brand-600 hover:underline ml-auto font-medium"
            >
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* SECTION 3: SUBSCRIPTIONS DATA TABLE */}
      <div className="rounded-xl border border-line bg-surface shadow-xs overflow-hidden">
        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center text-muted space-y-3">
            <div className="animate-spin inline-block h-6 w-6 border-2 border-brand-600 border-t-transparent rounded-full" />
            <p className="text-sm">Loading subscriptions…</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-10 text-center text-red-600 space-y-3">
            <p className="text-lg">⚠️</p>
            <p className="font-semibold text-sm">Failed to load subscription records.</p>
            <p className="text-xs text-muted">
              {(error as any)?.message || "Please check your network connection and credentials."}
            </p>
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Table Content */}
        {!isLoading && !isError && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-line bg-[#FAF9F5] text-xs font-semibold text-muted uppercase tracking-wider">
                    <th className="px-5 py-3.5">Email Address</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Subscription Date</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {subscriptions.map((sub) => {
                    const dateDisplay = sub.subscribedAt
                      ? new Date(sub.subscribedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : new Date(sub.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });

                    return (
                      <tr key={sub.id} className="hover:bg-paper/60 transition">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 font-bold text-xs uppercase">
                              {sub.email.charAt(0)}
                            </span>
                            <div>
                              <p className="font-medium text-ink">{sub.email}</p>
                              <p className="text-[11px] text-muted">
                                Registered: {new Date(sub.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${
                              sub.status === "SUBSCRIBED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : sub.status === "PENDING"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : "bg-gray-100 text-gray-700 border-gray-200"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                sub.status === "SUBSCRIBED"
                                  ? "bg-emerald-600"
                                  : sub.status === "PENDING"
                                  ? "bg-amber-600"
                                  : "bg-gray-400"
                              }`}
                            />
                            {sub.status === "SUBSCRIBED"
                              ? "Confirmed"
                              : sub.status === "PENDING"
                              ? "Pending"
                              : "Unsubscribed"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-xs text-muted">
                          <div>
                            <p className="text-ink font-medium">{dateDisplay}</p>
                            <p className="text-[10px]">
                              {sub.subscribedAt ? "Confirmed" : "Created"}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            {/* Action to change status */}
                            {sub.status !== "SUBSCRIBED" && (
                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: sub.id,
                                    status: "SUBSCRIBED",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition cursor-pointer disabled:opacity-50"
                                title="Confirm and mark as subscribed"
                              >
                                Confirm
                              </button>
                            )}

                            {sub.status === "SUBSCRIBED" && (
                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: sub.id,
                                    status: "UNSUBSCRIBED",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="rounded-lg bg-gray-50 border border-line px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-paper transition cursor-pointer disabled:opacity-50"
                                title="Unsubscribe this user"
                              >
                                Unsubscribe
                              </button>
                            )}

                            {sub.status === "UNSUBSCRIBED" && (
                              <button
                                onClick={() =>
                                  updateStatusMutation.mutate({
                                    id: sub.id,
                                    status: "PENDING",
                                  })
                                }
                                disabled={updateStatusMutation.isPending}
                                className="rounded-lg bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-medium text-amber-800 hover:bg-amber-100 transition cursor-pointer disabled:opacity-50"
                                title="Move back to pending"
                              >
                                Set Pending
                              </button>
                            )}

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                setDeletingId(sub.id);
                                setDeletingEmail(sub.email);
                              }}
                              className="rounded-lg border border-red-200 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
                              title="Delete subscription record"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {subscriptions.length === 0 && (
              <div className="p-12 text-center text-muted space-y-2">
                <p className="text-3xl">📬</p>
                <p className="font-semibold text-ink">No subscriptions found</p>
                <p className="text-xs">
                  {search || statusFilter !== "ALL"
                    ? "Try adjusting your search terms or status filters."
                    : "No users have subscribed to the newsletter yet."}
                </p>
                {(search || statusFilter !== "ALL") && (
                  <button
                    onClick={() => {
                      handleClearSearch();
                      handleStatusFilterChange("ALL");
                    }}
                    className="mt-2 text-xs font-semibold text-brand-600 hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}

            {/* Pagination Controls */}
            {pagination.total > 0 && (
              <div className="px-5 py-4 border-t border-line bg-[#FAF9F5] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-muted">
                <div>
                  Showing{" "}
                  <strong className="text-ink">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </strong>{" "}
                  to{" "}
                  <strong className="text-ink">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </strong>{" "}
                  of <strong className="text-ink">{pagination.total}</strong> subscribers
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="rounded-lg border border-line bg-surface px-3 py-1.5 font-medium text-ink hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
                  >
                    Previous
                  </button>

                  <span className="px-2">
                    Page <strong>{pagination.page}</strong> of{" "}
                    <strong>{pagination.totalPages}</strong>
                  </span>

                  <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page >= pagination.totalPages}
                    className="rounded-lg border border-line bg-surface px-3 py-1.5 font-medium text-ink hover:bg-paper disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL: DELETE CONFIRMATION */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-xl animate-in fade-in duration-150">
            <h3 className="text-lg font-bold text-ink">Delete Subscriber Record</h3>
            <p className="mt-2 text-sm text-muted">
              Are you sure you want to remove <strong>&ldquo;{deletingEmail}&rdquo;</strong> from
              the newsletter subscriber list? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setDeletingId(null);
                  setDeletingEmail(null);
                }}
                disabled={deleteMutation.isPending}
                className="rounded-lg border border-line px-4 py-2 text-xs font-semibold text-muted hover:bg-paper transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => deletingId && deleteMutation.mutate(deletingId)}
                disabled={deleteMutation.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 transition cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                {deleteMutation.isPending ? "Deleting…" : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
