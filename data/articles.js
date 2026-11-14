/**
 * +----------------------------------------------------------------------------+
 * | Rescue Retriever                                                           |
 * | Purpose: Stores the project-authored article content consumed by the       |
 * | article index and detail pages.                                            |
 * | Author: Alysha Pursley                                                     |
 * | Copyright (c) 2026 Alysha Pursley.                                         |
 * | Rights: Proprietary original contributions; see repository LICENSE.         |
 * +----------------------------------------------------------------------------+
 */
const articles = [
	{
		id: "shelter-to-service",
		title: "From Shelter to Service: The Case for Canine Rescue Candidate Identification",
		subtitle:
			"How structured screening can help rescue organizations find promising shelter dogs",
		category: "Research",
		date: "November 12, 2026",
		readTime: "5 min read",
		excerpt: "Shelter records already contain several of the fields needed for an initial search-and-rescue candidate screen. The harder part is turning those records into a repeatable review process.",
		tags: ["Data Analysis", "Animal Welfare", "Search & Rescue"],
		content: `
## A promising dog is not always an obvious candidate

A busy shelter can be full of dogs with very different backgrounds, personalities, and abilities. Some are waiting for a family. Others might also have characteristics worth exploring for specialized work. The challenge is that a conventional shelter record was never designed to answer a question such as, “Which dogs should a search-and-rescue trainer meet first?”

That is the question behind Rescue Retriever. I built the project to take existing shelter records and turn them into a more practical starting point for candidate identification. It does not select working dogs. It helps a person find records that deserve a closer look, and it explains why those records appeared in the results.

This is more than a technical distinction. A promising database match is still a real animal with a history that might not be reflected in a spreadsheet. Responsible screening has to leave room for what the data cannot tell us.

## Why shelters are worth considering

The National Disaster Search Dog Foundation (SDF) recruits dogs from shelters and rescue groups for training. Its published recruitment criteria include confidence, high energy, toy drive, sociability, and comfort in unfamiliar environments. SDF's program is evidence that a shelter pathway into rescue work exists, but its evaluation is far more involved than selecting a breed from a list.

SDF also describes a lengthy process involving training, pairing a dog with a handler, and pursuing certification. I think that context is essential when discussing any software designed to identify potential rescue candidates. Rescue Retriever operates at the *beginning* of that journey, not at the point where an animal is declared suitable for deployment.

The aim is to organize an initial search without pretending to perform a professional evaluation. With many records to review and only limited staff time, consistency and transparency can be meaningful improvements.

## From a shelter record to a reviewable shortlist

The supplied Rescue Retriever extract contains 10,000 records, including 5,589 records classified as dogs. These are project-supplied, historical records, not a live inventory of animals available today. The application uses recorded characteristics such as breed, sex, and age to compare each dog with three specified training profiles: Water Rescue, Mountain or Wilderness Rescue, and Disaster Rescue or Individual Tracking.

I kept those criteria explicit rather than burying them inside an opaque recommendation system. A reviewer can examine the breed, sex, and age checks and understand why an animal was included or excluded. An unfamiliar score might look impressive on a dashboard, but it is less useful when nobody can explain what went into it.

The workflow is straightforward: choose a program, narrow the records, inspect candidate details, compare summary information, and export the selected results for further investigation. The interface also provides a record-specific map for the source coordinates where they are available. It does not claim to locate a dog in real time.

## What the screening numbers actually show

Applying the project's strict rules yields 24 distinct dogs that match at least one profile. The program lists contain 17 Water Rescue matches, five Mountain or Wilderness matches, and four Disaster or Tracking matches. Those three counts add to 26 because two dogs qualify for more than one program.

It is easy to lose that distinction in a polished chart. **Twenty-four dogs** is the number of unique candidate records; **26 program matches** is the number of qualifying assignments across all profiles. Neither figure measures successful training outcomes, nor does it describe dogs currently available for placement.

A shortlist should therefore be interpreted as a set of leads. It can tell a trainer where to begin reviewing. It cannot establish physical fitness, persistence under distraction, confidence on unstable surfaces, medical suitability, or a dog's willingness to work with a handler.

## The missing information is often the most important

SDF emphasizes qualities such as play motivation, confidence, and sociability in its recruitment process. These are not the same as a breed label or a numerical age. A dog can meet every database condition and still be unsuitable for a demanding training program. Another dog could fail a rigid breed filter but display exceptional qualities during an in-person assessment.

The ASPCA also cautions against treating any single shelter behavior observation or assessment as a complete predictor of an animal's future behavior. Context, stress, and different sources of information matter. Although the ASPCA's guidance is primarily about shelter assessment and placement, its larger lesson applies here: meaningful decisions should use multiple kinds of evidence.

For that reason, I would treat a Rescue Retriever result as the first step in a review sequence: confirm the record, contact the shelter, assess the dog's health and behavior, involve qualified trainers, and document the outcome. The software should make that handoff easier, not skip it.

## What good screening software should promise

A useful tool does not need to claim that it can identify the next great rescue dog. Its value can be simpler and more defensible: consistent filters, visible criteria, reproducible counts, and a clear way to move from data to human follow-up.

I designed Rescue Retriever around that principle. It narrows the search while leaving the final judgment where it belongs, with people who can meet the dog, observe its behavior, and evaluate the requirements of the actual training program.

## Research and further reading

- [National Disaster Search Dog Foundation: Canine Recruitment](https://searchdogfoundation.org/canine-recruitment/)
- [National Disaster Search Dog Foundation: Canine Training Program](https://searchdogfoundation.org/canine-training-program/)
- [ASPCA: Position Statement on Shelter Dog Behavior Assessments](https://www.aspca.org/about-us/aspca-policy-and-position-statements/position-statement-shelter-dog-behavior-assessments)
- [City of Austin: Historical Austin Animal Center Outcomes Data](https://data.austintexas.gov/d/9t4d-g238)
     `,
	},
	{
		id: "breed-data-limitations",
		title: "Breed Classification in Shelter Data: Sources of Error and Practical Mitigation",
		subtitle:
			"Why exact breed matching requires careful interpretation and human review",
		category: "Technical",
		date: "November 12, 2026",
		readTime: "5 min read",
		excerpt: "Shelter breed labels are operational records, not genetic proof. Rescue Retriever treats them as screening data and preserves exact client-specified breed matches.",
		tags: ["Data Quality", "Normalization", "Methodology"],
		content: `
## A breed field looks simple until you rely on it

Open a shelter spreadsheet and the breed column can appear to offer a reassuringly clear answer. A dog is marked as a Labrador Retriever Mix, German Shepherd, or another familiar label. A filter checks the text, and suddenly the software seems to know which animals fit a training profile.

The problem is that the label may describe someone's visual assessment, not a verified genetic result. A computer can match a string perfectly while the real-world meaning of that string remains uncertain. I wanted Rescue Retriever's screening rules to be understandable without overstating what shelter data can establish.

## What research tells us about visual breed identification

A 2018 study by Gunter, Barber, and Wynne compared shelter staff breed labels with genetic testing in 919 dogs across two shelters. In the San Diego shelter sample, staff identified at least one breed in a dog's genetic heritage for 67.7% of tested dogs, but agreement fell to 10.4% when identifying more than one breed. The researchers emphasized the complexity of mixed-breed ancestry and the value of describing dogs as individuals.

A separate 2015 study examining pit bull-type labels found substantial variation between visual identification and DNA results. These studies do not mean shelter staff are careless. They show how difficult it is to infer ancestry from appearance, especially when multiple breeds may contribute to a dog's features.

That matters because automated sorting can make uncertain input look authoritative. A precise filter result does not automatically make the source classification precise.

## Why I kept the matching rules strict

Rescue Retriever uses client-defined breed lists for three rescue profiles. In the original screening approach, an animal matches a breed criterion only when its recorded value belongs to that specified list. My implementation preserves this exact-match behavior while trimming surrounding whitespace. It does not silently treat “Mix” and “Mixed” as interchangeable or infer synonyms from similar-looking strings.

This may sound conservative, but there is a reason. If I broadened matching without documenting the change, the number of selected candidates could increase and users might assume those new results met the original rules. That would make the software harder to audit. A revised matching policy can be valuable, but it should be a deliberate, versioned choice rather than an invisible convenience.

Strict matching has limitations too. A breed recorded with a different abbreviation, spelling, or convention may be missed even when the dog merits an in-person look. In other words, exact matching improves reproducibility, not biological certainty.

## Normalization is not the same as rewriting history

In data processing, normalization often means making values easier to compare: removing stray spaces, standardizing case, or mapping known aliases. Those changes should not erase the original value. If a reviewer sees “Labrador Retriever Mix” in the source, I want that source value to remain available even when a future system also offers a normalized category.

One approach for a more advanced version would be to maintain separate fields: **recorded breed**, **normalized comparison label**, and **match method**. The tool could then distinguish an exact match from a reviewed alias and from an uncertain suggestion. None of those additional categories should be presented as verified genetic identity.

This also matters for fairness. Rules based on a narrow breed list can exclude dogs with the right working qualities, particularly mixed-breed animals. SDF's recruitment program explicitly considers mixes of several working breeds and evaluates traits beyond ancestry. The lesson is not that all breed filters are useless. It is that breed alone should not carry more weight than the task justifies.

## How to spot a misleading result

Suppose one dog is labeled “German Shepherd” and another is labeled “German Shepherd Mix.” Under an exact-match list containing only the first string, the dogs receive different outcomes. The difference is a consequence of the written rule, not evidence that the first dog is more suitable for rescue work.

Or consider an animal whose label is blank. A careful system should identify the data as missing, not guess the breed and fill a seemingly complete record. Missing information should be visible because it changes how confidently the record can be interpreted.

Tests for the matching helper should cover spaces, casing decisions, missing fields, age boundaries, exact “Mix” wording, and dogs that qualify for multiple profiles. That protects the software from accidental shifts in meaning when the interface changes.

## Put the dog back into the decision

The ASPCA advises shelters to use multiple sources of behavioral information rather than relying on a single assessment. The same spirit should guide working-dog candidate identification: a record can suggest whom to meet, while experienced evaluators determine what the animal is actually like in relevant situations.

My priority in Rescue Retriever is therefore traceability. I want a reviewer to know the animal's recorded characteristics, the precise rule that produced the match, and the limits of the result. The right outcome is not a magically perfect list. It is a shortlist that people can question, reproduce, and improve.

## Research and further reading

- [Gunter, Barber & Wynne (2018): A Canine Identity Crisis](https://pmc.ncbi.nlm.nih.gov/articles/PMC6107223/)
- [Olson et al. (2015): Inconsistent Identification of Pit Bull-Type Dogs by Shelter Staff](https://pubmed.ncbi.nlm.nih.gov/26403955/)
- [National Disaster Search Dog Foundation: Canine Recruitment](https://searchdogfoundation.org/canine-recruitment/)
- [ASPCA: Position Statement on Shelter Dog Behavior Assessments](https://www.aspca.org/about-us/aspca-policy-and-position-statements/position-statement-shelter-dog-behavior-assessments)
     `,
	},
	{
		id: "geographic-patterns",
		title: "Geographic Patterns in Shelter Intake and Rescue Candidate Distribution",
		subtitle:
			"Using location fields to add geographic context to rescue-candidate review",
		category: "Analysis",
		date: "November 12, 2026",
		readTime: "5 min read",
		excerpt: "Latitude, longitude, and shelter-area location fields give reviewers another way to understand the records after rescue criteria are applied, without claiming patterns the dataset has not been formally tested to prove.",
		tags: ["Geography", "Data Visualization", "Analysis"],
		content: `
## Maps tell a story, but first we have to know whose story it is

A map can make a dataset feel immediately understandable. Rows of coordinates become points on familiar streets, and a reader starts seeing clusters, distances, and patterns. That visual clarity is useful, but it can also encourage conclusions that the source data does not support.

When I added geographic context to Rescue Retriever, I wanted the map to answer a modest, practical question: **Where does the selected record's stored coordinate place it?** I did not want it to suggest that the application knows a dog's current location, where a rescue event happened, or where search-and-rescue candidates are most likely to be found.

The distinction matters because every map inherits the strengths and weaknesses of the data behind it.

## Understanding the underlying records

Rescue Retriever uses a fixed extract of Austin-area shelter records supplied for the project. Its selected-record map reads coordinate values from that extract. The application does not perform real-time shelter lookups, location tracking, or independent verification of the coordinates.

The City of Austin publishes animal-center datasets, but the current public data system should not be confused with the project's historical extract. Austin's outcome data spanning 2013 through May 5, 2025 is now identified as a historical dataset, and the city publishes a separate outcomes dataset for records from May 5, 2025 onward. The city's own public dashboard also warns that its figures are not real time.

That history is worth mentioning because a portfolio demo can look current even when its underlying records are frozen. A static map should be labeled for what it is: an illustration based on stored data, not an availability service.

## What a coordinate does not prove

A latitude-and-longitude pair is not automatically a verified point of origin. Without confirming how the value was collected, it would be risky to interpret it as an intake location, a residence, an animal's present kennel, or the site of a rescue need. Even valid coordinates can be rounded, generalized, outdated, or attached to an administrative record instead of a physical event.

That is why Rescue Retriever shows one selected dog at a time rather than drawing a dramatic map of “candidate hotspots.” A map with hundreds of dots might imply a spatial analysis that the project has not performed. It could also encourage viewers to mistake concentrations in the dataset for actual concentrations of suitable rescue dogs.

If a user needs geographic evidence for operational planning, the correct next step is to verify the source, definition, precision, and timeliness of those location fields before running any spatial analysis.

## How the map fits into the screening workflow

The Dashboard begins with the dog's profile, not the map. A user filters the data, sorts or searches the table, and selects a record. The map then displays the selected record's stored coordinates where possible. This keeps location tied to a specific entry and gives the reviewer a clear route back to the underlying information.

The Analytics page serves a different purpose. It summarizes dog-only comparisons such as breed, recorded sex, age groups, and rescue-program qualification. Those charts explain the composition of the selected dataset; they do not establish whether one neighborhood has a higher probability of producing working dogs.

Keeping those two tasks separate helps avoid an easy analytical mistake: combining a descriptive chart with a map and presenting the result as if it demonstrated a causal relationship.

## The questions worth asking before drawing a conclusion

If I were extending the project into a genuine spatial study, I would first examine whether each coordinate represents a shelter facility, an intake address, a found location, or something else. I would check how many records have missing or duplicate coordinates, whether multiple rows describe the same animal, and whether records cover comparable time periods.

I would also ask what denominator is appropriate. Ten candidate records in one area mean very little without knowing how many total dogs were recorded there, what kinds of animals entered the system, and whether collection practices differed across locations. A meaningful geographic rate requires a clearly defined population, not just a cluster of markers.

Finally, I would separate historical patterns from current decisions. The Austin datasets and reporting systems have evolved, and a historical snapshot is not an operational substitute for contacting a shelter or verifying an individual animal's status.

## A careful visualization is still useful

None of these limitations mean the coordinates should be ignored. Location can help a reviewer orient themselves to a particular record and flag information worth checking. The benefit comes from treating the visualization as context instead of proof.

For Rescue Retriever, that is the boundary I want the interface to respect. The candidate criteria answer why a record qualifies under the project's rules. The map illustrates a stored geographic value. Human follow-up is still needed to establish what that value means and whether the animal is available for evaluation.

Good data storytelling sometimes means declining to tell a more dramatic story than the evidence supports.

## Research and further reading

- [City of Austin: Historical Animal Center Outcomes, 2013–2025](https://data.austintexas.gov/d/9t4d-g238)
- [City of Austin: Current Animal Center Intakes](https://data.austintexas.gov/d/pyqf-r2dc)
- [City of Austin: Animal Center Public Dashboard](https://www.austintexas.gov/animal-services/austin-animal-center-dashboard)
- [Data.gov: Animal Center Outcomes Data Catalog](https://catalog.data.gov/dataset/austin-animal-center-outcomes)
     `,
	},
	{
		id: "development-process",
		title: "Building Rescue Retriever: Technical Decisions and Tradeoffs",
		subtitle:
			"How the client workflow was preserved in a browser-friendly public implementation",
		category: "Technical",
		date: "November 12, 2026",
		readTime: "6 min read",
		excerpt: "The original client brief called for a database-backed dashboard. The public Rescue Retriever implementation keeps the filtering and visualization workflow reviewable without exposing private database credentials.",
		tags: ["Development", "Architecture", "Lessons Learned"],
		content: `
## The challenge was not simply displaying a table

Rescue Retriever began with a familiar software-development problem: take a working set of requirements, turn it into something people can actually use, and make the output trustworthy enough that someone understands what it means. The source material involved Austin-area shelter records and three client-specified rescue-training profiles. The intended user needed to explore those records without memorizing query syntax or manually checking each dog against a long list of conditions.

I approached the assignment as both a data problem and a user-experience problem. The interface needed filtering, candidate details, summary visualizations, geographic context, and a path for exporting records. But a usable dashboard also needs consistency. If the table reports one set of matches and a chart reports another, no amount of visual polish can fix the underlying confusion.

## From the original dashboard to a public demonstration

The original coursework involved a Python-based dashboard and a database-oriented workflow. For my public Rescue Retriever portfolio version, I built a browser-accessible demonstration that can run on GitHub Pages without exposing database credentials or requiring visitors to set up a private server.

That changes the architecture in an important way. The current demo uses a prepared, static shelter-data extract. Filtering, sorting, pagination, summaries, shortlist behavior, and CSV generation operate in the browser. It is designed to demonstrate the functionality and the reasoning behind it, not to impersonate a production shelter-management system.

I consider that an appropriate tradeoff for a public portfolio. A reviewer can open the site and explore the interface without signing in. At the same time, the README and the app need to make clear that its stored records are not synchronized with an active shelter database.

## Centralizing the rules instead of scattering them

The three rescue profiles use specified combinations of breed, recorded sex, and age range. In the updated application, I keep the profile definitions in data/rescueProfiles.js and the comparison utilities in lib/filterUtils.js. The goal is to have one source of truth that the candidate cards, lists, charts, and exports can all refer to.

This separation also helps with maintenance. A change to a profile should be handled as a reviewed rules change, not as four unrelated edits to different visual components. Automated tests can then check exact breed wording, boundary ages, missing data, and cases where one dog qualifies for multiple programs.

There is a human reason for this technical design: the person reading a candidate profile deserves a consistent answer to the question, “Why did this dog match?”

## Why explainability matters more than a mysterious score

The project's strict filter found 24 distinct qualifying dogs in the supplied records, with 26 matches across the three categories because two dogs match more than one profile. This is a reproducible result of the configured rules. It is not a prediction that 24 animals would succeed in training.

That distinction is supported by how professional rescue organizations actually recruit dogs. The National Disaster Search Dog Foundation describes characteristics such as motivation, confidence, sociability, and energy, followed by extensive evaluation and training. The ASPCA similarly emphasizes that behavior should be understood using multiple observations and sources. These are important reminders that static animal attributes should not be mistaken for validated behavioral assessments.

I kept those limits visible in the product rather than trying to make the interface sound more sophisticated than the data warrants.

## Building a dashboard people can navigate

The public application brings several jobs together. The Dashboard supports searching, sorting, filtering, and selecting a record. Candidate detail views reveal the matching criteria. Analytics presents dog-only breakdowns, while exports let a reviewer take the currently filtered information into another workflow.

I also gave navigation and documentation their own attention. Someone opening a portfolio demonstration should be able to understand what the product does, find the case study, read individual articles, and return to the main application without getting stranded on a page. Responsive layouts, consistent navigation, and descriptive links are part of the product, not decorative extras.

For geographic context, I kept the map tied to a selected record. The source coordinate can help orient a reviewer, but I deliberately avoid representing it as a live dog location or a verified geographic pattern.

## Quality checks and the limits of testing

I use automated checks to protect the rescue matching rules and catch regressions in page routing and static assets. They are especially useful when a small change to shared UI code could affect multiple pages. Formatting and source-file documentation also matter because this repository is something another developer may inspect, not just something a browser runs.

Still, automated test success does not prove the interface has been visually reviewed on every device. Browser testing, accessibility review, real-user feedback, and validation against production data remain separate activities. I prefer to describe those limits accurately rather than label a demo “fully validated” simply because its unit tests pass.

## What I would change for a production deployment

A production system would need more than a public static dataset. I would use an authenticated service for managed data access, enforce authorization on the server, add careful handling of updates and duplicate records, and design processes for logging and reviewing changes to qualification criteria. The interface would need clear record provenance and a way to indicate data freshness.

For candidate decisions, I would also add a documented review process that captures verified contact with the shelter, qualified trainer observations, and follow-up outcomes. Research on shelter breed identification shows why raw labels should not silently become biological conclusions; behavioral guidance shows why a single observation should not become a final judgment.

Those additions would create a more complete workflow, but they are future possibilities, not features I claim the current GitHub Pages demo already provides.

## The lesson I am taking forward

The most useful improvement I made was not an individual chart or animation. It was the effort to make different parts of the experience agree: consistent rules, traceable matches, appropriate visualizations, and documentation that tells visitors what the application does and does not do.

Rescue Retriever demonstrates how I approach software development when data has real-world consequences. I want the application to be approachable, but I also want its assumptions to remain visible. That combination matters long after the first version is finished.

## Research and further reading

- [National Disaster Search Dog Foundation: Canine Recruitment](https://searchdogfoundation.org/canine-recruitment/)
- [ASPCA: Shelter Dog Behavior Assessments](https://www.aspca.org/about-us/aspca-policy-and-position-statements/position-statement-shelter-dog-behavior-assessments)
- [Gunter, Barber & Wynne (2018): Shelter Dog Breed Identification Study](https://pmc.ncbi.nlm.nih.gov/articles/PMC6107223/)
- [City of Austin: Historical Animal Center Outcomes Dataset](https://data.austintexas.gov/d/9t4d-g238)
     `,
	},
];
export { articles, articles as A };
