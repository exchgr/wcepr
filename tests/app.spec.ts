import { expect, use } from "chai"
import chaiHttp, { request } from "chai-http"
// import { app } from "../src/app.ts"
// import * as pa from "../src/lib/parseArticle.ts"
import esmock from "esmock"
import MockDate from "mockdate"
import { stub } from "sinon"
import { mwApiResponse } from "./fixtures/mwApiResponse.ts"

use(chaiHttp)

describe("app", () => {
	describe("/feed.xml", () => {
		it("should render", async () => {
			const articleDate = new Date(2025, 8, 30)
			MockDate.set(articleDate)

			const {app} = await esmock("../src/app.ts", {
				"../src/lib/fetchArticle.ts": {
					fetchArticle: stub().withArgs(articleDate).resolves(mwApiResponse),
				},
			})

			const requester = request.execute(app)

			const response = await requester.get("/feed.xml")

			// TODO: change link rel="self" to depend on an environment variable
			expect(response.body.toString()).to.eq(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xml:base="https://en.wikipedia.org/wiki/Portal:Current_events">
  <title>Wikipedia Current Events</title>
  <subtitle>From Wikipedia, the free encyclopedia</subtitle>
  <link href="http://localhost:3000/feed.xml" rel="self"/>
  <link href="https://en.wikipedia.org/wiki/Portal:Current_events"/>
  <updated>2025-09-30T04:00:00.000Z</updated>
  <id>https://en.wikipedia.org/wiki/Portal:Current_events</id>
      <entry>
        <title>Current events – 2025 September 30</title>
        <author>
          <name>Wikipedia, the free encyclopedia</name>
        </author>
        <link href="https://en.wikipedia.org/wiki/Portal:Current_events/2025_September_30"/>
        <published>2025-09-30T04:00:00.000Z</published>
        <updated>2025-09-30T04:00:00.000Z</updated>
        <id>https://en.wikipedia.org/wiki/Portal:Current_events/2025_September_30</id>
        <content xml:lang="en" type="html">
    &lt;p&gt;&lt;b&gt;Armed conflicts and attacks&lt;/b&gt;
    &lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Israeli%E2%80%93Palestinian_conflict&quot; title&#x3D;&quot;Israeli–Palestinian conflict&quot;&gt;Israeli–Palestinian conflict&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Palestinian_political_violence&quot; title&#x3D;&quot;Palestinian political violence&quot;&gt;Palestinian political violence&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;A &lt;a href&#x3D;&quot;/wiki/Palestinian&quot; class&#x3D;&quot;mw-redirect&quot; title&#x3D;&quot;Palestinian&quot;&gt;Palestinian&lt;/a&gt; man &lt;a href&#x3D;&quot;/wiki/Vehicle_ramming_attack&quot; class&#x3D;&quot;mw-redirect&quot; title&#x3D;&quot;Vehicle ramming attack&quot;&gt;rams&lt;/a&gt; into &lt;a href&#x3D;&quot;/wiki/Israel&quot; title&#x3D;&quot;Israel&quot;&gt;Israeli&lt;/a&gt; pedestrians near &lt;a href&#x3D;&quot;/wiki/Al-Khader&quot; title&#x3D;&quot;Al-Khader&quot;&gt;Al-Khader&lt;/a&gt; in the &lt;a href&#x3D;&quot;/wiki/West_Bank&quot; title&#x3D;&quot;West Bank&quot;&gt;West Bank&lt;/a&gt;, injuring two children, before being shot. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.timesofisrael.com/two-teens-injured-in-car-ramming-terror-attack-on-west-bank-highway-near-jerusalem/&quot;&gt;(&lt;i&gt;The Times of Israel&lt;/i&gt;)&lt;/a&gt; &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.haaretz.com/israel-news/2025-09-30/ty-article/.premium/two-teenagers-wounded-in-ramming-attack-at-west-bank-junction-near-jerusalem/00000199-9a9a-d0f3-a599-defb3aff0000&quot;&gt;(Haaretz)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Russo-Ukrainian_war_(2022%E2%80%93present)&quot; title&#x3D;&quot;Russo-Ukrainian war (2022–present)&quot;&gt;Russo-Ukrainian war&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Attacks_on_civilians_in_the_Russo-Ukrainian_war_(2022%E2%80%93present)&quot; title&#x3D;&quot;Attacks on civilians in the Russo-Ukrainian war (2022–present)&quot;&gt;Attacks on civilians in the Russo-Ukrainian war&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;An overnight &lt;a href&#x3D;&quot;/wiki/Russian_Armed_Forces&quot; title&#x3D;&quot;Russian Armed Forces&quot;&gt;Russian&lt;/a&gt; &lt;a href&#x3D;&quot;/wiki/Drone_warfare&quot; title&#x3D;&quot;Drone warfare&quot;&gt;drone strike&lt;/a&gt; kills four people, all members of the same family, in &lt;a href&#x3D;&quot;/wiki/Chernechchyna,_Okhtyrka_Raion,_Sumy_Oblast&quot; title&#x3D;&quot;Chernechchyna, Okhtyrka Raion, Sumy Oblast&quot;&gt;Chernechchyna, Okhtyrka Raion, Sumy Oblast&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/Ukraine&quot; title&#x3D;&quot;Ukraine&quot;&gt;Ukraine&lt;/a&gt;. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.bbc.co.uk/news/articles/cdxqdpgznzeo&quot;&gt;(BBC News)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Insurgency_in_Balochistan&quot; title&#x3D;&quot;Insurgency in Balochistan&quot;&gt;Insurgency in Balochistan&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;Ten people are killed and over 30 others are injured in a &lt;a href&#x3D;&quot;/wiki/Suicide_attack&quot; title&#x3D;&quot;Suicide attack&quot;&gt;suicide&lt;/a&gt; &lt;a href&#x3D;&quot;/wiki/Car_bomb&quot; title&#x3D;&quot;Car bomb&quot;&gt;car bombing&lt;/a&gt; followed by gunfire outside the &lt;a href&#x3D;&quot;/wiki/Frontier_Corps&quot; title&#x3D;&quot;Frontier Corps&quot;&gt;Frontier Corps&lt;/a&gt;&#x27; headquarters in &lt;a href&#x3D;&quot;/wiki/Quetta&quot; title&#x3D;&quot;Quetta&quot;&gt;Quetta&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/Balochistan,_Pakistan&quot; title&#x3D;&quot;Balochistan, Pakistan&quot;&gt;Balochistan Province&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/Pakistan&quot; title&#x3D;&quot;Pakistan&quot;&gt;Pakistan&lt;/a&gt;. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.aljazeera.com/news/2025/9/30/suicide-blast-near-paramilitary-headquarters-in-pakistans-quetta-kills-10&quot;&gt;(Al Jazeera)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;
    &lt;p&gt;&lt;b&gt;Disasters and accidents&lt;/b&gt;
    &lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/2025_Cebu_earthquake&quot; title&#x3D;&quot;2025 Cebu earthquake&quot;&gt;2025 Cebu earthquake&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;A M&lt;sub&gt;w&lt;/sub&gt; 6.9 &lt;a href&#x3D;&quot;/wiki/Earthquake&quot; title&#x3D;&quot;Earthquake&quot;&gt;earthquake&lt;/a&gt; hits the central &lt;a href&#x3D;&quot;/wiki/Philippines&quot; title&#x3D;&quot;Philippines&quot;&gt;Philippines&lt;/a&gt; with damages and &lt;a href&#x3D;&quot;/wiki/Power_interruption&quot; class&#x3D;&quot;mw-redirect&quot; title&#x3D;&quot;Power interruption&quot;&gt;power interruption&lt;/a&gt; reported, particularly in &lt;a href&#x3D;&quot;/wiki/Cebu&quot; title&#x3D;&quot;Cebu&quot;&gt;Cebu&lt;/a&gt;. At least five people are reported dead as &lt;a href&#x3D;&quot;/wiki/Search_and_rescue&quot; title&#x3D;&quot;Search and rescue&quot;&gt;search and rescue&lt;/a&gt; operations are ongoing. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.theguardian.com/world/2025/sep/30/central-philippines-hit-by-powerful-earthquake&quot;&gt;(AFP via &lt;i&gt;The Guardian&lt;/i&gt;)&lt;/a&gt; &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.newsweek.com/earthquake-philippines-cebu-today-usgs-magnitude-warning-10805872&quot;&gt;(&lt;i&gt;Newsweek&lt;/i&gt;)&lt;/a&gt; &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.aa.com.tr/en/asia-pacific/5-dead-after-magnitude-69-earthquake-jolts-philippines/3703494&quot;&gt;(Anadolu Agency)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;
    &lt;li&gt;Nine people are killed after an under-construction coal handling enclosure collapsed in &lt;a href&#x3D;&quot;/wiki/Chennai&quot; title&#x3D;&quot;Chennai&quot;&gt;Chennai&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/India&quot; title&#x3D;&quot;India&quot;&gt;India&lt;/a&gt;. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.ndtv.com/india-news/9-killed-in-arch-collapse-at-tamil-nadu-power-plant-pm-announces-compensation-9373869&quot;&gt;(NDTV)&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;Five people are killed after a truck collides with two motorbikes in &lt;a href&#x3D;&quot;/wiki/Bhind_district&quot; title&#x3D;&quot;Bhind district&quot;&gt;Bhind district&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/Madhya_Pradesh&quot; title&#x3D;&quot;Madhya Pradesh&quot;&gt;Madhya Pradesh&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/India&quot; title&#x3D;&quot;India&quot;&gt;India&lt;/a&gt;. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://indianexpress.com/article/india/five-killed-truck-collides-motorcycles-madhya-pradesh-bhind-10279947/?ref&#x3D;archive_pg(The&quot;&gt;Indian express)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;
    &lt;p&gt;&lt;b&gt;International relations&lt;/b&gt;
    &lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/France%E2%80%93South_Africa_relations&quot; title&#x3D;&quot;France–South Africa relations&quot;&gt;France–South Africa relations&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/List_of_diplomatic_missions_of_South_Africa&quot; title&#x3D;&quot;List of diplomatic missions of South Africa&quot;&gt;South African ambassador&lt;/a&gt; to &lt;a href&#x3D;&quot;/wiki/France&quot; title&#x3D;&quot;France&quot;&gt;France&lt;/a&gt; and former &lt;a href&#x3D;&quot;/wiki/Minister_of_Sport,_Arts_and_Culture&quot; title&#x3D;&quot;Minister of Sport, Arts and Culture&quot;&gt;Minister of Sport, Arts and Culture&lt;/a&gt; &lt;a href&#x3D;&quot;/wiki/Nathi_Mthethwa&quot; title&#x3D;&quot;Nathi Mthethwa&quot;&gt;Nathi Mthethwa&lt;/a&gt; is found dead outside his hotel in &lt;a href&#x3D;&quot;/wiki/17th_arrondissement_of_Paris&quot; title&#x3D;&quot;17th arrondissement of Paris&quot;&gt;17th arrondissement&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/Paris&quot; title&#x3D;&quot;Paris&quot;&gt;Paris&lt;/a&gt;. The ambassador had previously been reported missing by his wife. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.reuters.com/world/europe/south-africas-ambassador-france-found-dead-paris-le-parisien-2025-09-30/&quot;&gt;(Reuters)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;
    &lt;p&gt;&lt;b&gt;Law and crime&lt;/b&gt;
    &lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Capital_punishment_in_the_Democratic_Republic_of_the_Congo&quot; title&#x3D;&quot;Capital punishment in the Democratic Republic of the Congo&quot;&gt;Capital punishment in the Democratic Republic of the Congo&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;A &lt;a href&#x3D;&quot;/wiki/Military_court&quot; class&#x3D;&quot;mw-redirect&quot; title&#x3D;&quot;Military court&quot;&gt;military court&lt;/a&gt; in the &lt;a href&#x3D;&quot;/wiki/Democratic_Republic_of_the_Congo&quot; title&#x3D;&quot;Democratic Republic of the Congo&quot;&gt;Democratic Republic of the Congo&lt;/a&gt; sentences former president &lt;a href&#x3D;&quot;/wiki/Joseph_Kabila&quot; title&#x3D;&quot;Joseph Kabila&quot;&gt;Joseph Kabila&lt;/a&gt; to death &lt;i&gt;&lt;a href&#x3D;&quot;/wiki/In_absentia&quot; class&#x3D;&quot;mw-disambig&quot; title&#x3D;&quot;In absentia&quot;&gt;in absentia &lt;/a&gt;&lt;/i&gt; for treason. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://apnews.com/article/joseph-kabila-treason-convicted-death-sentence-m23-rwanda-b2a21a4203fd78e68cf4fc506d56544b&quot;&gt;(AP)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Chinese_intelligence_activity_abroad&quot; title&#x3D;&quot;Chinese intelligence activity abroad&quot;&gt;Chinese intelligence activity abroad&lt;/a&gt;, &lt;a href&#x3D;&quot;/wiki/China%E2%80%93Germany_relations&quot; title&#x3D;&quot;China–Germany relations&quot;&gt;China–Germany relations&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;The &lt;a href&#x3D;&quot;/wiki/Higher_Regional_Court_of_Dresden&quot; title&#x3D;&quot;Higher Regional Court of Dresden&quot;&gt;Higher Regional Court of Dresden&lt;/a&gt; convicts a &lt;a href&#x3D;&quot;/wiki/Chinese_people_in_Germany&quot; title&#x3D;&quot;Chinese people in Germany&quot;&gt;Chinese&lt;/a&gt;–&lt;a href&#x3D;&quot;/wiki/Germany&quot; title&#x3D;&quot;Germany&quot;&gt;German&lt;/a&gt; man of &lt;a href&#x3D;&quot;/wiki/Espionage&quot; title&#x3D;&quot;Espionage&quot;&gt;espionage&lt;/a&gt; for &lt;a href&#x3D;&quot;/wiki/China&quot; title&#x3D;&quot;China&quot;&gt;China&lt;/a&gt; while working for &lt;a href&#x3D;&quot;/wiki/Alternative_for_Germany&quot; title&#x3D;&quot;Alternative for Germany&quot;&gt;AfD&lt;/a&gt; politician &lt;a href&#x3D;&quot;/wiki/Maximilian_Krah&quot; title&#x3D;&quot;Maximilian Krah&quot;&gt;Maximilian Krah&lt;/a&gt;, giving him a sentence of over five years. A &lt;a href&#x3D;&quot;/wiki/Defendant&quot; title&#x3D;&quot;Defendant&quot;&gt;co-defendant&lt;/a&gt; accused of supplying cargo and passenger information from her job at &lt;a href&#x3D;&quot;/wiki/Leipzig/Halle_Airport&quot; title&#x3D;&quot;Leipzig/Halle Airport&quot;&gt;Leipzig Airport&lt;/a&gt; is given a &lt;a href&#x3D;&quot;/wiki/Suspended_sentence&quot; title&#x3D;&quot;Suspended sentence&quot;&gt;suspended sentence&lt;/a&gt; of one and a half years. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.msn.com/en-us/news/world/former-aide-to-german-far-right-lawmaker-in-the-european-parliament-is-convicted-of-spying-for-china/ar-AA1NzB1x?ocid&#x3D;BingNewsSerp&quot;&gt;(AP)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;
    &lt;p&gt;&lt;b&gt;Science and technology&lt;/b&gt;
    &lt;/p&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Human_rights_in_Afghanistan&quot; title&#x3D;&quot;Human rights in Afghanistan&quot;&gt;Human rights in Afghanistan&lt;/a&gt;
    &lt;ul&gt;&lt;li&gt;&lt;a href&#x3D;&quot;/wiki/Telecommunications&quot; title&#x3D;&quot;Telecommunications&quot;&gt;Telecommunications&lt;/a&gt; are almost entirely down in &lt;a href&#x3D;&quot;/wiki/Afghanistan&quot; title&#x3D;&quot;Afghanistan&quot;&gt;Afghanistan&lt;/a&gt; following a &lt;a href&#x3D;&quot;/wiki/Internet_outage&quot; title&#x3D;&quot;Internet outage&quot;&gt;internet cut&lt;/a&gt; by the &lt;a href&#x3D;&quot;/wiki/Government_of_Afghanistan&quot; title&#x3D;&quot;Government of Afghanistan&quot;&gt;government&lt;/a&gt;, with &lt;a href&#x3D;&quot;/wiki/Mobile_phone&quot; title&#x3D;&quot;Mobile phone&quot;&gt;mobile phone&lt;/a&gt; services down to 1% of normal connectivity levels. &lt;a rel&#x3D;&quot;nofollow&quot; class&#x3D;&quot;external text&quot; href&#x3D;&quot;https://www.theguardian.com/world/2025/sep/30/afghanistan-mobile-phones-internet-telecoms-blackout-taliban&quot;&gt;(&lt;i&gt;The Guardian&lt;/i&gt;)&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;</content>
        <category term="news"/>
      </entry>
</feed>
`)
			expect(response).to.have.status(200)
			expect(response).to.have.header(
				"Content-Type",
				"application/rss+xml; charset=utf-8",
			)
		})
	})
})
