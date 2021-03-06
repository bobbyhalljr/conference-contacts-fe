import React from 'react';

export default function NotificationsComponent(props) {
  const {
    data,
    dismissNotification,
    notificationCount,
    dismissLoading,
    receivedConnections,
    acceptConnection,
    position,
    connectLoading,
    deleteConnection,
    deleteLoading,
  } = props;

  return (
    <div className="profile-card bg-white pb-4 mobile:mx-auto desktop:ml-16 desktop:w-1/2">
      <div className="flex mx-4 pt-4 my-6 items-center">
        <div className="relative flex-grow-0">
          <svg
            width="23"
            height="21"
            viewBox="0 0 23 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.3263 4.97082C21.9776 4.16337 21.4748 3.43167 20.846 2.81667C20.2168 2.19984 19.4748 1.70965 18.6606 1.37276C17.8163 1.02204 16.9108 0.842522 15.9966 0.844627C14.7139 0.844627 13.4626 1.19585 12.3751 1.85927C12.1149 2.01797 11.8678 2.19228 11.6336 2.38219C11.3995 2.19228 11.1523 2.01797 10.8921 1.85927C9.80466 1.19585 8.55327 0.844627 7.27066 0.844627C6.34708 0.844627 5.45212 1.02154 4.60658 1.37276C3.78967 1.71097 3.05341 2.19748 2.42121 2.81667C1.7916 3.43097 1.28866 4.16285 0.940875 4.97082C0.579248 5.81115 0.394531 6.70352 0.394531 7.62189C0.394531 8.48824 0.571443 9.39101 0.922664 10.3094C1.21665 11.0769 1.63811 11.873 2.17665 12.6769C3.02999 13.9491 4.20333 15.2759 5.66025 16.621C8.07457 18.8506 10.4655 20.3907 10.5669 20.4532L11.1835 20.8486C11.4567 21.0229 11.8079 21.0229 12.0811 20.8486L12.6977 20.4532C12.7991 20.3881 15.1874 18.8506 17.6044 16.621C19.0613 15.2759 20.2346 13.9491 21.088 12.6769C21.6265 11.873 22.0506 11.0769 22.3419 10.3094C22.6932 9.39101 22.8701 8.48824 22.8701 7.62189C22.8727 6.70352 22.688 5.81115 22.3263 4.97082ZM11.6336 18.7907C11.6336 18.7907 2.37178 12.8564 2.37178 7.62189C2.37178 4.97082 4.56496 2.82187 7.27066 2.82187C9.17246 2.82187 10.8219 3.88334 11.6336 5.43392C12.4453 3.88334 14.0948 2.82187 15.9966 2.82187C18.7023 2.82187 20.8954 4.97082 20.8954 7.62189C20.8954 12.8564 11.6336 18.7907 11.6336 18.7907Z"
              fill="black"
            />
          </svg>
          {notificationCount > 0 && (
            <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-purple-700 text-white w-6 h-6 text-xs rounded-full leading-none flex items-center justify-center">
              {notificationCount >= 1000
                ? notificationCount.toString()[0] + 'k'
                : notificationCount}
            </div>
          )}
        </div>
        <p className="text-xl flex-1 text-center -ml-6">Notifications</p>
      </div>
      <p className="ml-4 mt-4 text-xl desktop:text-base text-gray-500">Notifications</p>
      {!data.user.notifications.length ? (
        <div className="flex flex-col items-center my-16">
          <svg
            width="90"
            height="93"
            viewBox="0 0 90 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M89 33.5V92.5H1V33.5L46 65L89 33.5Z" fill="#6640FF" />
            <path
              d="M89 92.5V33.5L46 65M89 92.5H1M89 92.5L46 65M1 92.5V33.5L46 65M1 92.5L46 65"
              stroke="#003A8C"
            />
            <path d="M46.5 1L1 33L46 64.5L89 33L46.5 1Z" fill="white" stroke="#BFBFBF" />
            <path
              d="M39 44C39 44 42.6246 47.7097 45.5 47.5C48.0392 47.3149 51 44 51 44"
              stroke="#595959"
              strokeLinecap="round"
            />
            <circle cx="27" cy="30" r="3" fill="#595959" />
            <circle cx="63" cy="30" r="3" fill="#595959" />
          </svg>
          <p className="text-xl mt-10 text-gray-500 desktop:text-base ">You are all caught up!</p>
        </div>
      ) : (
        <ul className="my-5">
          {data.user.notifications.map((n) => (
            <li
              key={n.id}
              className="flex items-center justify-between mx-4 bg-gray-100 p-3 rounded-lg"
            >
              <span className="mr-1">{n.message}</span>
              <button
                onClick={() =>
                  dismissNotification({
                    variables: { id: n.id },
                    optimisticResponse: {
                      __typename: 'Mutation',
                      deleteNotification: {
                        __typename: 'ProfileMutationResponse',
                        code: 200,
                        success: true,
                        message: 'Notification dismissed successfully',
                        notification: {
                          __typename: 'Notification',
                          id: n.id,
                        },
                      },
                    },
                  })
                }
                disabled={dismissLoading}
                className="text-2xl focus:outline-none"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="ml-4 text-xl text-gray-500  desktop:text-base ">New Requests</p>
      {!receivedConnections.length ? (
        <div className="flex flex-col items-center my-16">
          <svg
            width="124"
            height="95"
            viewBox="0 0 124 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56 46.5085C56 46.5085 59.6246 42.7989 62.5 43.0085C65.0392 43.1937 68 46.5085 68 46.5085"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="44" cy="27" r="3" fill="black" />
            <circle cx="80" cy="27" r="3" fill="black" />
            <g opacity="0.5">
              <path
                d="M58.6282 0H30.8827C29.2882 0 28 1.28819 28 2.88265V30.6282C28 31.0246 28.3243 31.3489 28.7207 31.3489H58.6282C59.0246 31.3489 59.3489 31.0246 59.3489 30.6282V0.720663C59.3489 0.324298 59.0246 0 58.6282 0ZM53.5835 25.5835H33.7653V5.76531H53.5835V25.5835ZM41.1521 18.9174H46.1967C46.5931 18.9174 46.9174 18.5931 46.9174 18.1967V13.1521C46.9174 12.7557 46.5931 12.4314 46.1967 12.4314H41.1521C40.7557 12.4314 40.4314 12.7557 40.4314 13.1521V18.1967C40.4314 18.5931 40.7557 18.9174 41.1521 18.9174ZM58.6282 37.8348H28.7207C28.3243 37.8348 28 38.1591 28 38.5555V66.301C28 67.8955 29.2882 69.1837 30.8827 69.1837H58.6282C59.0246 69.1837 59.3489 68.8594 59.3489 68.463V38.5555C59.3489 38.1591 59.0246 37.8348 58.6282 37.8348ZM53.5835 63.4184H33.7653V43.6001H53.5835V63.4184ZM41.1521 56.7522H46.1967C46.5931 56.7522 46.9174 56.4279 46.9174 56.0316V50.9869C46.9174 50.5906 46.5931 50.2663 46.1967 50.2663H41.1521C40.7557 50.2663 40.4314 50.5906 40.4314 50.9869V56.0316C40.4314 56.4279 40.7557 56.7522 41.1521 56.7522ZM94.301 0H66.5555C66.1591 0 65.8348 0.324298 65.8348 0.720663V30.6282C65.8348 31.0246 66.1591 31.3489 66.5555 31.3489H96.463C96.8594 31.3489 97.1837 31.0246 97.1837 30.6282V2.88265C97.1837 1.28819 95.8955 0 94.301 0ZM91.4184 25.5835H71.6001V5.76531H91.4184V25.5835ZM78.9869 18.9174H84.0316C84.4279 18.9174 84.7522 18.5931 84.7522 18.1967V13.1521C84.7522 12.7557 84.4279 12.4314 84.0316 12.4314H78.9869C78.5906 12.4314 78.2663 12.7557 78.2663 13.1521V18.1967C78.2663 18.5931 78.5906 18.9174 78.9869 18.9174ZM96.463 37.8348H92.139C91.7427 37.8348 91.4184 38.1591 91.4184 38.5555V50.6266H84.3919V38.5555C84.3919 38.1591 84.0676 37.8348 83.6712 37.8348H66.5555C66.1591 37.8348 65.8348 38.1591 65.8348 38.5555V68.463C65.8348 68.8594 66.1591 69.1837 66.5555 69.1837H70.8795C71.2758 69.1837 71.6001 68.8594 71.6001 68.463V46.4828H78.6266V55.6712C78.6266 56.0676 78.9509 56.3919 79.3473 56.3919H96.463C96.8594 56.3919 97.1837 56.0676 97.1837 55.6712V38.5555C97.1837 38.1591 96.8594 37.8348 96.463 37.8348ZM83.6712 63.4184H79.3473C78.9509 63.4184 78.6266 63.7427 78.6266 64.139V68.463C78.6266 68.8594 78.9509 69.1837 79.3473 69.1837H83.6712C84.0676 69.1837 84.3919 68.8594 84.3919 68.463V64.139C84.3919 63.7427 84.0676 63.4184 83.6712 63.4184ZM96.463 63.4184H92.139C91.7427 63.4184 91.4184 63.7427 91.4184 64.139V68.463C91.4184 68.8594 91.7427 69.1837 92.139 69.1837H96.463C96.8594 69.1837 97.1837 68.8594 97.1837 68.463V64.139C97.1837 63.7427 96.8594 63.4184 96.463 63.4184Z"
                fill="#8C8C8C"
              />
              <path
                d="M56 46.5085C56 46.5085 59.6246 42.7989 62.5 43.0085C65.0392 43.1937 68 46.5085 68 46.5085"
                stroke="#262626"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="44" cy="27" r="3" fill="#262626" />
              <circle cx="80" cy="27" r="3" fill="#262626" />
              <path
                d="M6.81184 64.9364C6.89334 66.3147 8.07675 67.3659 9.45505 67.2844C10.8334 67.2029 11.8846 66.0195 11.8031 64.6412L6.81184 64.9364ZM28.8047 40.2888C28.8047 37.7888 28.8037 37.7888 28.8026 37.7888C28.8022 37.7888 28.8011 37.7888 28.8003 37.7888C28.7987 37.7888 28.7969 37.7888 28.795 37.7888C28.7911 37.7888 28.7867 37.7889 28.7816 37.7889C28.7714 37.789 28.7588 37.7891 28.7438 37.7893C28.7139 37.7897 28.6743 37.7904 28.6256 37.7916C28.5283 37.7942 28.3943 37.799 28.2275 37.8082C27.8942 37.8266 27.4278 37.8625 26.8587 37.9325C25.7243 38.0722 24.1601 38.3502 22.4178 38.9078C18.9483 40.018 14.6016 42.2968 11.6848 46.9638L15.9248 49.6138C18.0079 46.2808 21.1612 44.5597 23.9417 43.6699C25.3243 43.2274 26.5726 43.0055 27.4695 42.8951C27.916 42.8401 28.2699 42.8135 28.503 42.8006C28.6194 42.7942 28.7051 42.7913 28.7567 42.7899C28.7825 42.7892 28.7997 42.789 28.8079 42.7889C28.8119 42.7888 28.8137 42.7888 28.8132 42.7888C28.813 42.7888 28.8122 42.7888 28.8107 42.7888C28.81 42.7888 28.8092 42.7888 28.8082 42.7888C28.8077 42.7888 28.8068 42.7888 28.8065 42.7888C28.8056 42.7888 28.8047 42.7888 28.8047 40.2888ZM11.6848 46.9638C8.95807 51.3266 7.74757 55.7956 7.21248 59.1443C6.94397 60.8248 6.84243 62.2423 6.80848 63.2516C6.79149 63.7569 6.79138 64.1617 6.79597 64.448C6.79827 64.5912 6.80175 64.705 6.80489 64.7871C6.80646 64.8282 6.80796 64.8613 6.80918 64.8863C6.80979 64.8987 6.81033 64.9092 6.81078 64.9175C6.81101 64.9217 6.81121 64.9254 6.81139 64.9285C6.81148 64.9301 6.81156 64.9315 6.81164 64.9328C6.81167 64.9335 6.81172 64.9344 6.81174 64.9347C6.81179 64.9355 6.81184 64.9364 9.30748 64.7888C11.8031 64.6412 11.8032 64.642 11.8032 64.6427C11.8032 64.6429 11.8033 64.6436 11.8033 64.644C11.8033 64.6447 11.8034 64.6454 11.8034 64.6459C11.8035 64.647 11.8035 64.6476 11.8035 64.6476C11.8035 64.6478 11.8034 64.6459 11.8032 64.642C11.8028 64.6344 11.8021 64.6188 11.8012 64.5956C11.7994 64.5493 11.797 64.4727 11.7953 64.3678C11.792 64.1581 11.7916 63.8363 11.8057 63.4197C11.8337 62.5852 11.919 61.3778 12.1498 59.9333C12.6134 57.032 13.6516 53.251 15.9248 49.6138L11.6848 46.9638Z"
                fill="#8C8C8C"
              />
              <path
                d="M116.993 64.9364C116.911 66.3147 115.728 67.3659 114.35 67.2844C112.971 67.2029 111.92 66.0195 112.002 64.6412L116.993 64.9364ZM95 40.2888C95 37.7888 95.001 37.7888 95.0021 37.7888C95.0025 37.7888 95.0036 37.7888 95.0044 37.7888C95.006 37.7888 95.0078 37.7888 95.0097 37.7888C95.0135 37.7888 95.018 37.7889 95.0231 37.7889C95.0332 37.789 95.0458 37.7891 95.0608 37.7893C95.0908 37.7897 95.1304 37.7904 95.1791 37.7916C95.2764 37.7942 95.4104 37.799 95.5772 37.8082C95.9105 37.8266 96.3769 37.8625 96.946 37.9325C98.0804 38.0722 99.6446 38.3502 101.387 38.9078C104.856 40.018 109.203 42.2968 112.12 46.9638L107.88 49.6138C105.797 46.2808 102.644 44.5597 99.863 43.6699C98.4804 43.2274 97.2321 43.0055 96.3352 42.8951C95.8887 42.8401 95.5348 42.8135 95.3017 42.8006C95.1853 42.7942 95.0996 42.7913 95.048 42.7899C95.0222 42.7892 95.005 42.789 94.9968 42.7889C94.9928 42.7888 94.9909 42.7888 94.9914 42.7888C94.9917 42.7888 94.9925 42.7888 94.994 42.7888C94.9947 42.7888 94.9955 42.7888 94.9965 42.7888C94.997 42.7888 94.9979 42.7888 94.9981 42.7888C94.9991 42.7888 95 42.7888 95 40.2888ZM112.12 46.9638C114.847 51.3266 116.057 55.7956 116.592 59.1443C116.861 60.8248 116.962 62.2423 116.996 63.2516C117.013 63.7569 117.013 64.1617 117.009 64.448C117.006 64.5912 117.003 64.705 117 64.7871C116.998 64.8282 116.997 64.8613 116.996 64.8863C116.995 64.8987 116.994 64.9092 116.994 64.9175C116.994 64.9217 116.993 64.9254 116.993 64.9285C116.993 64.9301 116.993 64.9315 116.993 64.9328C116.993 64.9335 116.993 64.9344 116.993 64.9347C116.993 64.9355 116.993 64.9364 114.497 64.7888C112.002 64.6412 112.002 64.642 112.001 64.6427C112.001 64.6429 112.001 64.6436 112.001 64.644C112.001 64.6447 112.001 64.6454 112.001 64.6459C112.001 64.647 112.001 64.6476 112.001 64.6476C112.001 64.6478 112.001 64.6459 112.001 64.642C112.002 64.6344 112.003 64.6188 112.003 64.5956C112.005 64.5493 112.008 64.4727 112.009 64.3678C112.013 64.1581 112.013 63.8363 111.999 63.4197C111.971 62.5852 111.886 61.3778 111.655 59.9333C111.191 57.032 110.153 53.251 107.88 49.6138L112.12 46.9638Z"
                fill="#8C8C8C"
              />
              <line
                x1="44.5"
                y1="68.5"
                x2="44.5"
                y2="92.5"
                stroke="#8C8C8C"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <line
                x1="81.5"
                y1="68.5"
                x2="81.5"
                y2="92.5"
                stroke="#8C8C8C"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          </svg>
          <p className="text-xl mt-10 text-gray-500 desktop:text-base ">
            Go out and meet more people!
          </p>
        </div>
      ) : (
        <ul className="my-5">
          {receivedConnections.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between mx-4 bg-gray-100 p-3 rounded-lg mt-3"
            >
              <img
                src={c.sender.picture}
                alt="what they look like"
                className="rounded-full w-16 h-16 object-cover"
              />
              <h3 className="font-bold truncate w-1/3">{c.sender.name}</h3>
              <div>
                <button
                  className="rounded-lg px-3 py-2 bg-purple-500 mr-3 text-white"
                  onClick={() => {
                    const { latitude, longitude } = position.coords;
                    acceptConnection({
                      variables: {
                        id: c.id,
                        receiverCoords: { latitude, longitude },
                      },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        acceptConnection: {
                          __typename: 'ProfileMutationResponse',
                          code: 200,
                          success: true,
                          message: 'Connection request accepted',
                          connection: {
                            __typename: 'Connection',
                            id: c.id,
                            location: c.location,
                            sender: c.sender,
                            receiver: c.receiver,
                          },
                        },
                      },
                    });
                  }}
                >
                  Accept
                </button>
                <button
                  className="rounded-lg text-red-500"
                  onClick={() =>
                    deleteConnection({
                      variables: { id: c.id },
                      optimisticResponse: {
                        __typename: 'Mutation',
                        deleteConnection: {
                          __typename: 'ProfileMutationResponse',
                          code: 200,
                          success: true,
                          message: 'Connection deleted successfully',
                          connection: {
                            __typename: 'Connection',
                            id: c.id,
                          },
                        },
                      },
                    })
                  }
                  disabled={deleteLoading}
                >
                  <p className="text-2xl">&times;</p>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
