const apiFunctions = {
    summary: {
      name: "summaryRaw",
      desc: "Gives summary in raw format (no formatting)",
      route: "/",
      nested: false
    },
    queries: {
      name: "getAllQueries",
      desc: "Get DNS query data",
      route: "/queries",
      nested: true
    },
    queryTypes: {
      name: "getQueryTypes",
      desc: "Shows number of queries that the Pi-hole's DNS server has processed",
      route: "/query-types",
      nested: false
    },
    querySources: {
      name: "getQuerySources",
      desc: "Data for top clients",
      route: "/query-sources",
      nested: false
    },
    overTime10mins: {
      name: "overTimeData10mins",
      desc: "Data for generating the domains/ads over time (10 mins)",
      route: "/over-time-10-mins",
      nested: false
    },
    topItems: {
      name: "topItems",
      desc: "Data for generating the top domains and/or ad lists",
      route: "/top-items",
      nested: false
    },
    forwardDestinations: {
      name: "getForwardDestinations",
      desc: "Shows the # of queries that have been forwarded to upstream DNS servers and the target IP address",
      route: "/forward-destinations",
      nested: false
    },
    enable: {
      name: "enable",
      desc: "Enable Pi-hole",
      route: "/enable",
      nested: false
    },
    disable: {
      name: "disable",
      desc: "Disable Pi-hole",
      route: "/disable",
      nested: false
    },
    version: {
      name: "version",
      desc: "Get Pi-hole version",
      route: "/version",
      nested: false
    },
    type: {
      name: "type",
      desc: "Get API backend type for Pi-hole",
      route: "/type",
      nested: false
    },
    recentlyBlocked: {
      name: "recentlyBlocked",
      desc: "Get recently blocked domains",
      route: "/recently-blocked",
      nested: false
    }
}

module.exports = {
    apiFunctions
};