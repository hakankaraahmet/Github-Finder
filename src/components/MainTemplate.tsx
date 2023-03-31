import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  fetchReposAction,
} from "../redux/slices/githubSlices";

const MainTemplate = () => {
  const [user, setUser] = useState<string>("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchReposAction(user));
    dispatch(fetchProfileAction(user));
  };

  const store = useSelector((state: any) => state?.repos);
  const { loading, reposList, profileList, error } = store;

  return (
    <div className="min-h-screen border border-gray-800 bg-gray-800">
      {" "}
      <section className="relative 2xl ">
        <div className="relative container px-4 mx-auto">
          <div className="text-center mb-20">
            <div className="flex justify-center">
              <img
                className="h-64  rounded-lg object-cover"
                src="/github-mark-white.png"
                alt=""
              />
            </div>

            <h2 className="mt-16 mb-5 text-5xl font-bold font-heading text-white">
              GitHub Profile Finder
            </h2>
            <div className="mt-8 flex justify-center">
              {/* input */}
              <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                type="text"
                name="email"
                id="email"
                className="shadow-sm text-center focus:ring-indigo-500 p-2 focus:border-indigo-500  sm:text-sm border-gray-300 w-full rounded-md lg:w-1/2"
                placeholder="Search For User"
              />
              <button
                className="border border-white rounded-xl text-white ml-4 px-10 "
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
          {/* Content goes here */}
          {loading ? (
            <h1 className="text-green-300 text-3xl text-center">
              Loading please wait...
            </h1>
          ) : error ? (
            <h2 className="text-red-300 text-3xl text-center">
              {error?.data.message}
            </h2>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap -mx-4 mb-20">
                <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                  <div className="bg-gray-600 rounded-b-lg">
                    <div className="flex justify-center">
                      <img
                        className="w-56 h-56 rounded-full mt-8"
                        src={profileList?.avatar_url}
                        alt=""
                      />
                    </div>
                    <div className="px-14 py-8">
                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        Name:{" "}
                        <span className="text-white">
                          {profileList?.name} {profileList?.login}
                        </span>
                      </h4>
                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        {/* Bio goes here */}
                        Bio:{" "}
                        <span className="text-white">{profileList?.bio}</span>
                      </h4>
                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        {/* Company goes here */}
                        Company:{" "}
                        <span className="text-white">
                          {profileList?.company}
                        </span>
                      </h4>
                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        {/* Location goes here */}
                        Location:{" "}
                        <span className="text-white">
                          {profileList?.location}
                        </span>
                      </h4>

                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        {/* followers goes here */}
                        Followers:{" "}
                        <span className="text-white">
                          {profileList?.followers}
                        </span>
                      </h4>

                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        {/* following goes here */}
                        Following:{" "}
                        <span className="text-white">
                          {profileList?.following}
                        </span>
                      </h4>

                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        Repositories:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profileList?.public_repos
                            ? profileList?.public_repos
                            : "N/A"}
                        </span>
                      </h4>

                      <div className="mb-6 py-px bg-gray-500"></div>
                      <h4 className="mb-8 lg:mb-4  text-gray-900 font-bold">
                        Gists:{" "}
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-500 text-green-800">
                          {profileList?.public_gists
                            ? profileList?.public_gists
                            : "N/A"}
                        </span>
                      </h4>
                      <div className="mb-6 py-px bg-gray-500"></div>
                      <div className="md:text-right">
                        <a
                          href={profileList?.html_url}
                          target="_blank"
                          className="inline-block px-12 py-4 border border-gray-300 hover:border-gray-200 rounded-full font-bold text-gray-900"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repository list */}
                <div className="w-full lg:w-1/2 px-4">
                  {/* Loop this */}

                  {reposList?.name !== "Error" &&
                    reposList?.map((repo: any) => (
                      <a
                        href={repo?.html_url}
                        target="_blank"
                        className="text-xl font-bold  text-gray-900"
                        key={repo?.html_url}
                      >
                        <div className="py-6 px-8 mb-4 bg-gray-600 rounded-lg">
                          <div className="flex items-center">{repo?.name}</div>
                        </div>
                      </a>
                    ))}

                  <div className="py-6 px-8"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MainTemplate;
