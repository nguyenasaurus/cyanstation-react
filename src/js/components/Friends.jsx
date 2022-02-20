import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
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
		},
	]);

	const [friendsLinks, setFriendsLinks] = useState([]);

	// Get Friends data from db
	useEffect(() => {
		const getFriendsContent = async () => {
			const friendsContentRef = collection(db, "friends");
			const queryFriendsContent = query(friendsContentRef);
			const friendsContentData = await getDocs(queryFriendsContent);
			setFriendsContent(
				friendsContentData.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
			);
		};

		// const getFriendsLinks = async () => {
		// 	const
		// }
		getFriendsContent();
	}, []);

	return (
		<div className="py-8 sm:px-8">
			<article
				className="min-h-screen min-w-full bg-no-repeat bg:cover sm:bg-contain bg-center bg-top"
				style={{
					backgroundImage: `url("${friendsContent[0].bgImg}")`,
				}}>
				<ul className="flex">
					<li className="text-link">
						<a className="border-b-2" href="">
							Test
						</a>
					</li>
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
