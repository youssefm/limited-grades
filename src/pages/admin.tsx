import { NextPage } from "next";
import { useState } from "react";

import SpinnerIcon from "assets/spinner.svg";
import Select from "components/common/Select";
import useFetch from "hooks/useFetch";

const Admin: NextPage = () => {
  const [selectedAction, setSelectedAction] = useState<string>();
  const { data: actionOptions } = useFetch<string[]>("/api/admin", []);
  const [actionOutput, setActionOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full overflow-y-auto p-12 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100">
      <div className="mx-auto w-[720px]">
        <div className="rounded-t-lg bg-neutral-100 p-8 dark:bg-neutral-800">
          <h1 className="mb-8 text-center text-3xl">Run an Admin Action</h1>
          <form
            className="flex gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (selectedAction && !loading) {
                setLoading(true);
                const response = await fetch(`/api/admin/${selectedAction}`, {
                  method: "POST",
                });
                setActionOutput(
                  ((await response.json()) as { output: string[] }).output
                );
                setLoading(false);
              }
            }}
          >
            <Select
              value={selectedAction}
              options={actionOptions}
              onChange={setSelectedAction}
              getLabel={(action) => action}
              isClearable
              placeholder="Select an admin action..."
              autoFocus
              instanceId="admin-action-select"
              className="grow"
            />
            <button
              className="w-24 rounded bg-blue-500 dark:bg-amber-600"
              type="submit"
            >
              {!loading && <span className="text-neutral-100">Run</span>}
              {loading && (
                <SpinnerIcon
                  width="1em"
                  height="1em"
                  className="mx-auto animate-spin fill-white text-black"
                />
              )}
            </button>
          </form>
        </div>
        {actionOutput.length > 0 && (
          <div className="p-4 font-mono">
            <div className="pb-2">Output:</div>
            <div className="whitespace-pre-wrap break-words text-sm">
              {actionOutput.join("\n")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
