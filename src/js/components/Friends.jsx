import React, { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

import parse from "html-react-parser";

function Friends() {
	const [friendsContent, setFriendsContent] = useState([
		{
			bgImg: "",
			contentCopy: "",
			mainImg: "",
			subtitle: "",
			title: "",
			id: "",
		},
	]);

	const [friendsLinks, setFriendsLinks] = useState([]);

	// Get Friends data from db
	useEffect(() => {
		const getFriendsLinks = async (id) => {
			const friendsLinksRef = collection(db, `friends/${id}/links`);
			const friendsLinksData = await getDocs(
				friendsLinksRef,
				orderBy("order", "asc")
			);
			setFriendsLinks(
				friendsLinksData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};

		const getFriendsContent = async () => {
			const friendsContentRef = collection(db, "friends");
			const queryFriendsContent = query(friendsContentRef);
			const friendsContentData = await getDocs(queryFriendsContent);
			const friendsData = friendsContentData.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setFriendsContent(friendsData);
			getFriendsLinks(friendsData[0].id);
		};

		getFriendsContent();
	}, []);

	const randomNumber = () => Math.floor(Math.random() * 81);

	return (
		<div className="py-8 sm:px-8">
			<article
				className="relative min-h-screen min-w-full bg-no-repeat bg:cover sm:bg-contain bg-center bg-top"
				style={{
					backgroundImage: `url("${friendsContent[0].bgImg}")`,
				}}>
				<ul className="absolute min-w-full min-h-full flex flex-col justify-center px-4">
					{friendsLinks.map((friend) => (
						<li
							className="extra-bold text-link my-4 text-center"
							key={friend.order}
							style={{ marginLeft: `${randomNumber()}%` }}>
							<a
								className="sm:whitespace-nowrap border-b-2 backdrop-blur bg-whiteSemiTransparent p-2 mr-4 sm:mr-0"
								href={friend.link}
								target="_blank">
								{friend.name}
							</a>
						</li>
					))}
				</ul>
			</article>
			<article className="flex flex-col sm:flex-row mr-4 ml-12 sm:ml-24 sm:mx-24">
				<figure className="flex flex-col justify-end min-w-fit mr-4 mb-2 sm:mb-0">
					<img
						src={friendsContent[0].mainImg}
						alt={friendsContent[0].title}
					/>
				</figure>
				<div className="flex flex-col justify-end">
					<h1 className="text-highlight text-2xl mb-4">
						{friendsContent[0].title}
					</h1>
					<h3 className="mb-2">{friendsContent[0].subtitle}</h3>
					{parse(friendsContent[0].contentCopy)}
				</div>
			</article>
		</div>
	);
}

export default Friends;
