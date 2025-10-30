import React, { useMemo, useState } from 'react';
import { __ } from '@wordpress/i18n';
import { LibraryNav, formatItem, formatSection } from '@beaverbuilder/cloud-ui';
import { Page, Icon, Input } from 'assistant/ui';
import { useAppState, useSystemState } from 'assistant/data';
import Actions from './actions';
import LibrariesFilter from './filter';
import LibrariesList from './list';

const getSections = (user, teams, libraries) => {
	const getItems = (type = 'user', id = null) => {
		const items = id ? libraries[type][id] : libraries[type];
		if (!items) return [];
		return items.map(formatItem);
	};

	const getTeamSections = (teams = []) => {
		return teams.map((section) => ({
			...formatSection(section),
			items: getItems('team', section.id),
			canCreateLibraries: section.permissions.edit_libraries,
		}));
	};

	const communityLibs = getItems('access');

	const sections = [
		{
			key: 'user',
			label: user ? user.name : '',
			avatar: user?.avatar ? user.avatar.sizes.thumb.url : user?.gravatar?.md,
			to: '/libraries/user',
			items: getItems(),
			canCreateLibraries: true,
		},
		{
			key: 'shared',
			label: __('Shared Libraries'),
			avatar: <Icon.Shared />,
			to: '/libraries/shared',
			isEnabled: !!libraries?.shared?.length,
			items: getItems('shared'),
			canCreateLibraries: false,
		},
		{
			key: 'community',
			label: __('Community Libraries'),
			avatar: <Icon.Swirl />,
			isEnabled: !!communityLibs.length,
			items: communityLibs,
			canCreateLibraries: false,
		},
		...getTeamSections(teams),
	];

	return sections;
};

export default ({ preloadedLib = false, preloadedTeams = false }) => {
	const { cloudUser } = useSystemState();
	const { filter, libraries: librariesData, teams: teamsData } = useAppState('libraries');
	const { owner, ...query } = filter;
	const isLoadingLibraries = false;
	const libraries = preloadedLib ? preloadedLib : librariesData;
	const teams = preloadedTeams ? preloadedTeams : teamsData;

	// --- New feature: filter LibraryNav sections by global filter.search (if present)

	const search = (filter?.search || '').trim().toLowerCase();

	const allSections = useMemo(
		() => getSections(cloudUser, teams, libraries),
		[cloudUser, teams, libraries]
	);
	const filteredSections = useMemo(() => {
		if (!search) return allSections;
		const match = (s) => (s || '').toLowerCase().includes(search);
		const filterItems = (items = []) =>
			items.filter((it) => match(it?.label) || match(it?.name));
		return allSections
			.map((section) => ({
				...section,
				items: filterItems(section.items),
				isEnabled: section.isEnabled ?? true,
			}))
			// keep sections that have at least one matching item
			.filter((s) => s.items && s.items.length);
	}, [allSections, search]);

	return (
		<Page
			title={__('Libraries')}
			icon={<Icon.Library context="sidebar" />}
			shouldShowBackButton={false}
			actions={<Actions />}
			padX={false}
			padY={false}
		>
			{/* Existing filter bar (drives filter in app state, incl. filter.search) */}
			<LibrariesFilter />

			<LibraryNav
				sections={filteredSections}
				isLoading={isLoadingLibraries}
				linkSectionHeaders={false}
				displayItemsAs="grid"
			/>

			<div className="fl-asst-libraries">
				{(!owner || owner === 'all' || owner === 'user') && (
					<LibrariesList
						headline={cloudUser.name.endsWith('s') ? `${cloudUser.name}'` : `${cloudUser.name}'s`}
						query={query}
					/>
				)}
				{!!libraries?.shared?.length && (owner === 'all' || owner === 'shared') && (
					<LibrariesList headline={__('Shared Libraries')} type="shared" query={query} />
				)}

				{teams.map((team) => {
					if (owner === 'all' || owner === `team_${team.id}`) {
						return (
							<LibrariesList
								key={team.id}
								headline={cloudUser.name.endsWith('s') ? `${team.name}'` : `${team.name}'s`}
								type="team"
								team={team}
								query={query}
							/>
						);
					}
					return null;
				})}
			</div>
		</Page>
	);
};
