export type blizzApiMythicPlusLeaderBoard = {
  _links: {
    self: {
      href: string;
    };
  };
  map: {
    name: string;
    id: number;
  };
  period: 641;
  period_start_timestamp: number;
  period_end_timestamp: number;
  connected_realm: {
    href: string;
  };

  leading_groups: [
    {
      ranking: number;
      duration: number;
      completed_timestamp: number;
      keystone_level: number;
      members: [
        {
          profile: {
            name: string;
            id: number;
            realm: {
              key: {
                href: string;
              };
              id: number;
              slug: string;
            };
          };
          faction: {
            type: string;
          };
          specialization: {
            key: {
              href: string;
            };
            id: number;
          };
        },
        {
          profile: {
            name: string;
            id: number;
            realm: {
              key: {
                href: string;
              };
              id: number;
              slug: string;
            };
          };
          faction: {
            type: string;
          };
          specialization: {
            key: {
              href: string;
            };
            id: number;
          };
        },
        {
          profile: {
            name: string;
            id: number;
            realm: {
              key: {
                href: string;
              };
              id: number;
              slug: string;
            };
          };
          faction: {
            type: string;
          };
          specialization: {
            key: {
              href: string;
            };
            id: number;
          };
        },
        {
          profile: {
            name: string;
            id: number;
            realm: {
              key: {
                href: string;
              };
              id: number;
              slug: string;
            };
          };
          faction: {
            type: string;
          };
          specialization: {
            key: {
              href: string;
            };
            id: number;
          };
        }
      ];
    }
  ];
};
